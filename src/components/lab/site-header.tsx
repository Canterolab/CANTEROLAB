"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { CloseIcon, MenuIcon, SearchIcon } from "@/components/lab/icons";
import { ThemeToggle } from "@/components/lab/theme-toggle";

export type NavItem = { label: string; href: string };
export type SearchEntry = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  href: string;
};

const pagesNav: NavItem[] = [
  { label: "Todos os artigos", href: "/artigos" },
  { label: "O Lab", href: "/sobre" },
  { label: "Projetos do Lab", href: "/projetos" },
  { label: "Certificações", href: "/certificacoes" },
  { label: "Recursos", href: "/recursos" },
  { label: "Bancada do Lab", href: "/lab" },
  { label: "Contato", href: "/contato" },
];

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

function SearchDialog({ entries }: { entries: SearchEntry[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return entries.slice(0, 6);
    return entries.filter((entry) =>
      normalize(
        [entry.title, entry.description, entry.category, ...entry.tags].join(" "),
      ).includes(q),
    );
  }, [entries, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !typing && !dialogRef.current?.open) {
        event.preventDefault();
        dialogRef.current?.showModal();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        className="cl-search"
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Buscar no Lab"
      >
        <SearchIcon />
        <span className="txt">Buscar no Lab</span>
        <kbd>/</kbd>
      </button>
      <dialog
        ref={dialogRef}
        className="cl-search-dialog"
        aria-label="Buscar artigos"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        onClose={() => setQuery("")}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por título, editoria ou tópico…"
          aria-label="Termo de busca"
          autoFocus
        />
        {results.length ? (
          <ul>
            {results.map((entry) => (
              <li key={entry.href}>
                <Link href={entry.href} onClick={() => dialogRef.current?.close()}>
                  <span className="cl-label">{entry.category}</span>
                  <b>{entry.title}</b>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">Nada encontrado para “{query}”.</p>
        )}
      </dialog>
    </>
  );
}

export function SiteHeader({
  editorias,
  searchIndex,
}: {
  editorias: NavItem[];
  searchIndex: SearchEntry[];
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => setMenuOpen(false), [pathname]);

  const nav = (className: string, label: string) => (
    <nav className={className} aria-label={label}>
      {editorias.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="cl-header">
      <div className="cl-header__in">
        <Link className="cl-wordmark" href="/" aria-label="CanteroLab — início">
          Cantero<span>Lab</span>
          <i aria-hidden="true">_</i>
        </Link>
        {nav("cl-nav", "Editorias")}
        <div className="cl-header__tools">
          <SearchDialog entries={searchIndex} />
          <Link className="cl-nav-link cl-desktop-only" href="/sobre">
            O Lab
          </Link>
          <ThemeToggle />
          <button
            className="cl-iconbtn cl-header__menu"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="cl-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>
      {nav("cl-nav cl-nav--scroll cl-mobile-nav", "Editorias (mobile)")}
      {menuOpen ? (
        <nav id="cl-menu" className="cl-menu" aria-label="Páginas do Lab">
          {pagesNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
