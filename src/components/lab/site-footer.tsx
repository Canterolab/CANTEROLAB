import Link from "next/link";

import type { NavItem } from "@/components/lab/site-header";
import { siteConfig } from "@/config/site";

export function SiteFooter({ editorias }: { editorias: NavItem[] }) {
  const { links } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="cl-footer">
      <div className="cl-footer__in">
        <div>
          <Link className="cl-wordmark" href="/" aria-label="CanteroLab — início">
            Cantero<span>Lab</span>
            <i aria-hidden="true">_</i>
          </Link>
          <p className="cl-footer__about">
            Blog de estudos sobre SQL Server, cloud, automação e desenvolvimento,
            escrito por quem resolve isso no dia a dia.
          </p>
        </div>
        <div>
          <h2 className="cl-label">Editorias</h2>
          <ul>
            {editorias.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="cl-label">O Lab</h2>
          <ul>
            <li>
              <Link href="/lab">Bancada do Lab</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/projetos">Projetos do Lab</Link>
            </li>
            <li>
              <Link href="/certificacoes">Certificações</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="cl-label">Redes</h2>
          <ul>
            {links.github ? (
              <li>
                <a href={links.github} target="_blank" rel="noreferrer">
                  GitHub · DBCantero
                </a>
              </li>
            ) : null}
            {links.linkedin ? (
              <li>
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="cl-footer__base">
        <span className="cl-meta">
          © {year} {siteConfig.shortName} · {siteConfig.author}
        </span>
        <Link className="cl-meta" href="/contato">
          Aberto a trocas e colaborações → vamos conversar
        </Link>
      </div>
    </footer>
  );
}
