import Image from "next/image";

import { ArrowIcon, GithubIcon, LinkedinIcon } from "@/components/lab/icons";
import { siteConfig } from "@/config/site";

/** Caixa do autor: o cartão de visita discreto no fim de cada artigo. */
export function AuthorBox() {
  const { links } = siteConfig;

  return (
    <aside className="cl-author" aria-labelledby="autor-nome">
      <Image
        className="cl-author__photo"
        src={siteConfig.authorPhoto}
        alt={`Foto de ${siteConfig.author}`}
        width={104}
        height={104}
        sizes="104px"
      />
      <div>
        <span className="cl-label">Sobre o autor</span>
        <p className="cl-author__name" id="autor-nome">
          {siteConfig.author}
        </p>
        <p className="cl-author__bio">{siteConfig.authorBio}</p>
        <ul className="cl-author__stack" aria-label="Stack principal">
          {siteConfig.authorStack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="cl-author__links">
          {links.github ? (
            <a href={links.github} target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </a>
          ) : null}
          {links.linkedin ? (
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon />
              LinkedIn
            </a>
          ) : null}
          <a className="talk" href={`${links.email}?subject=${encodeURIComponent("Vamos conversar?")}`}>
            Vamos conversar? <ArrowIcon />
          </a>
        </div>
      </div>
    </aside>
  );
}
