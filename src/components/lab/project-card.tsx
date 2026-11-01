import { type Project, projectStatusLabels } from "@/data/projects";

/** Card de estudo de caso dos Projetos do Lab: problema → abordagem (→ resultado). */
export function LabProjectCard({
  project,
  headingLevel = 3,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const base = `/images/projects/${project.image}`;
  const hasFoot = project.stack.length > 0 || project.status;

  return (
    <article className="cl-project" id={project.slug}>
      <div className="cl-project__img">
        <picture>
          <source type="image/avif" srcSet={`${base}@1x.avif 1x, ${base}@2x.avif 2x`} />
          <source type="image/webp" srcSet={`${base}@1x.webp 1x, ${base}@2x.webp 2x`} />
          {/* Imagens já otimizadas em AVIF/WebP @1x/@2x. */}
          <img
            src={`${base}@1x.webp`}
            alt={`Capa do projeto ${project.title}`}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="cl-project__body">
        <span className="cl-label">
          {project.kind ? `Estudo de caso · ${project.kind}` : "Projetos do Lab"}
        </span>
        <Heading className="cl-project__title">{project.title}</Heading>
        {project.steps.length ? (
          <ul className="cl-project__steps">
            {project.steps.map((step) => (
              <li key={step.label}>
                <b>{step.label}</b>
                <span>{step.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {hasFoot ? (
          <div className="cl-project__foot">
            <span className="cl-meta">{project.stack.join(" · ")}</span>
            {project.status ? (
              <span className="cl-status">{projectStatusLabels[project.status]}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
