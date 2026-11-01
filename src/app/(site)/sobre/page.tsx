import Image from "next/image";
import Link from "next/link";

import { GithubIcon, LinkedinIcon } from "@/components/lab/icons";
import { LabProjectCard } from "@/components/lab/project-card";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { getAllCertifications } from "@/lib/certifications";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sobre Alef Cantero e o Lab",
  description:
    "Quem escreve o CanteroLab: Tech Lead em ERP/PDV para varejo, com 8+ anos de SQL Server, estudando Azure SQL, Python e C#.",
  path: "/sobre",
});

const areas = [
  {
    title: "SQL Server",
    text: "Performance, Query Store, índices, planos de execução e troubleshooting em ambientes de ERP de varejo.",
  },
  {
    title: "Azure SQL",
    text: "Migração e operação de bancos na nuvem; foco atual dos estudos para a DP-300.",
  },
  {
    title: "Python",
    text: "Automação de rotinas, ETL de planilhas e integrações com o banco.",
  },
  {
    title: "C# / .NET",
    text: "APIs com ASP.NET Core, Dapper e Entity Framework Core.",
  },
];

const inProgress = [
  { title: "DP-300", detail: "Azure Database Administrator Associate" },
  { title: "DP-900", detail: "Azure Data Fundamentals" },
];

export default function AboutPage() {
  const certifications = getAllCertifications();
  const { links } = siteConfig;
  const person = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    jobTitle: "Tech Lead",
    worksFor: { "@type": "Organization", name: "Linx Sistemas" },
    image: absoluteUrl(siteConfig.authorPhoto),
    url: absoluteUrl("/sobre"),
    sameAs: [links.github, links.linkedin].filter(Boolean),
    knowsAbout: ["SQL Server", "Azure SQL", "T-SQL", "Python", "C#", ".NET"],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: person }} />
      <div className="wrap">
        <section className="s-intro" aria-labelledby="sobre-titulo">
          <div>
            <span className="cl-label cl-label--accent cl-rise">{"// Sobre · O Lab"}</span>
            <h1 id="sobre-titulo" className="cl-rise d1">
              Um laboratório de estudos sobre{" "}
              <span className="grad-text">dados, cloud e automação.</span>
            </h1>
            <p className="a-lede cl-rise d2" style={{ margin: 0 }}>
              Sou {siteConfig.author}. Escrevo o CanteroLab para registrar, com contexto e
              evidência, o que aprendo resolvendo problemas reais de banco de dados.
            </p>
          </div>
          <div className="s-photo cl-rise d2">
            <Image
              src={siteConfig.authorPhoto}
              alt={`Foto de ${siteConfig.author}`}
              width={460}
              height={460}
              sizes="(max-width: 760px) 200px, 400px"
              priority
            />
          </div>
        </section>

        <section className="s-cols" aria-labelledby="trajetoria">
          <h2 id="trajetoria">Trajetória</h2>
          <div className="prose">
            <p>
              Há mais de oito anos trabalho com SQL Server, quase sempre dentro de ERPs de
              varejo: bancos grandes, muitas lojas, operação que não pode parar. Hoje sou Tech
              Lead na Linx Sistemas e lidero um time de suporte. É dessa rotina que vem a
              maioria das perguntas que viram artigo aqui.
            </p>
            <p>
              A base técnica veio da formação em SQL Server na Impacta, com o Prof. Landry
              Duailibe. Depois vieram Python para automatizar o que era manual, C# e .NET para
              construir ferramentas internas e, agora, Azure SQL e IA aplicada ao
              desenvolvimento.
            </p>
            <p>
              Na rotina com tecnologia, muita coisa só fica clara depois de testar, errar e
              corrigir. Criei o Lab para não deixar esses aprendizados se perderem quando uma
              tarefa termina, incluindo os testes que falharam e os detalhes que fizeram
              diferença no resultado.
            </p>
          </div>
        </section>

        <section className="s-cols" aria-labelledby="areas">
          <h2 id="areas">Áreas de domínio</h2>
          <div className="areas">
            {areas.map((area) => (
              <div className="area" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="s-cols" aria-labelledby="certificacoes">
          <h2 id="certificacoes">Certificações</h2>
          <div>
            <div className="certs">
              {inProgress.map((cert) => (
                <div className="cert on" key={cert.title}>
                  <span className="cl-label cl-label--accent">Em preparação</span>
                  <b>{cert.title}</b>
                  <span>{cert.detail}</span>
                </div>
              ))}
              {certifications.map((cert) => (
                <div className="cert" key={cert.id}>
                  <span className="cl-label">Concluída</span>
                  <b>{cert.title}</b>
                  <span>
                    {cert.issuer} · {cert.date.slice(0, 4)}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ margin: "16px 0 0" }}>
              <Link className="cl-btn cl-btn--link" href="/certificacoes">
                Ver credenciais →
              </Link>
            </p>
          </div>
        </section>

        <section className="s-cols" aria-labelledby="projetos">
          <h2 id="projetos">Projetos do Lab</h2>
          <div>
            <p className="s-note">
              Experimentos e estudos de caso do laboratório: o problema e a abordagem de cada um.
            </p>
            <div className="grid-2">
              {projects.map((project) => (
                <LabProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="closing" aria-labelledby="conversar">
          <div>
            <span className="cl-label">Aberto a trocas e colaborações</span>
            <h2 id="conversar">Quer conversar sobre dados, automação ou um projeto?</h2>
            <p>Respondo mensagens pelo formulário de contato, por e-mail e pelo LinkedIn.</p>
          </div>
          <div className="links">
            <Link className="cl-btn cl-btn--primary" href="/contato">
              Vamos conversar?
            </Link>
            {links.linkedin ? (
              <a className="cl-btn cl-btn--secondary" href={links.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon />
                LinkedIn
              </a>
            ) : null}
            {links.github ? (
              <a className="cl-btn cl-btn--secondary" href={links.github} target="_blank" rel="noreferrer">
                <GithubIcon />
                GitHub
              </a>
            ) : null}
          </div>
        </section>
      </div>
      <div className="foot-gap" />
    </>
  );
}
