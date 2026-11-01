import Image from "next/image";

import { ArrowIcon } from "@/components/lab/icons";
import { PageIntro } from "@/components/lab/page-intro";
import { LabResourceList } from "@/components/lab/resource-list";
import { SectionHead } from "@/components/lab/section-head";
import { resources } from "@/data/resources";
import { getAllCertifications } from "@/lib/certifications";
import { createPageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Certificações",
  description: "Certificações, cursos e trilhas de estudo de Alef Cantero.",
  path: "/certificacoes",
});

const inProgress = [
  { title: "DP-300", detail: "Azure Database Administrator Associate" },
  { title: "DP-900", detail: "Azure Data Fundamentals" },
];

export default function CertificationsPage() {
  const certifications = getAllCertifications();

  return (
    <>
      <PageIntro
        label="Aprendizado validado"
        title="Certificações"
        highlight="e trilhas"
        description="Credenciais com contexto: o que cobrem, quando foram concluídas e onde verificar."
      />
      <section className="sec wrap" aria-labelledby="em-preparacao">
        <SectionHead id="em-preparacao" title="Em preparação" />
        <div className="certs certs--wide">
          {inProgress.map((cert) => (
            <div className="cert on" key={cert.title}>
              <span className="cl-label cl-label--accent">Em preparação</span>
              <b>{cert.title}</b>
              <span>{cert.detail}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="sec wrap" aria-labelledby="concluidas">
        <SectionHead id="concluidas" title="Concluídas" />
        {certifications.length ? (
          <div className="grid-2">
            {certifications.map((cert) => (
              <article className="res cert-item" key={cert.id}>
                {cert.imagePath ? (
                  <Image
                    className="cert-badge"
                    src={cert.imagePath}
                    alt={`Selo: ${cert.title}`}
                    width={64}
                    height={64}
                  />
                ) : null}
                <div>
                  <span className="cl-label cl-label--accent">{cert.issuer}</span>
                  <h2>{cert.title}</h2>
                  {cert.description ? <p>{cert.description}</p> : null}
                  <div className="res__foot">
                    <span className="cl-meta">
                      <time dateTime={cert.date}>{formatDate(cert.date)}</time>
                      {cert.credentialId ? ` · ID ${cert.credentialId}` : null}
                    </span>
                    {cert.credentialUrl ? (
                      <a className="cl-btn cl-btn--link" href={cert.credentialUrl} target="_blank" rel="noreferrer">
                        Ver credencial <ArrowIcon />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="cl-empty">As credenciais entram aqui assim que forem cadastradas.</p>
        )}
      </section>
      <section className="sec wrap" aria-labelledby="estudos">
        <SectionHead id="estudos" title="Cursos e estudos recomendados" href="/recursos" linkLabel="Todos os recursos" />
        <LabResourceList resources={resources.slice(0, 4)} headingLevel={3} />
      </section>
      <div className="foot-gap" />
    </>
  );
}
