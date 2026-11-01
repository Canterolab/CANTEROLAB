"use client";

import { MoonIcon, SunIcon } from "@/components/lab/icons";

/** Alterna entre claro e escuro e guarda a escolha. O ícone é decidido via CSS. */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* armazenamento indisponível: mantém só nesta visita */
    }
  };

  return (
    <button
      className="cl-iconbtn cl-theme-toggle"
      type="button"
      onClick={toggle}
      aria-label="Alternar tema claro/escuro"
    >
      <span className="when-dark">
        <SunIcon size={18} />
      </span>
      <span className="when-light">
        <MoonIcon size={18} />
      </span>
    </button>
  );
}

