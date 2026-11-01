import { ArrowIcon } from "@/components/lab/icons";
import type { Resource } from "@/data/resources";

/** Recursos recomendados em cards de vidro. */
export function LabResourceList({
  resources,
  headingLevel = 2,
}: {
  resources: Resource[];
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  if (!resources.length) {
    return <p className="cl-empty">A curadoria começa com uso real: as recomendações entram depois de revisitadas.</p>;
  }

  return (
    <div className="grid-2">
      {resources.map((resource) => (
        <article className="res" key={resource.href}>
          <span className="cl-label cl-label--accent">{resource.category}</span>
          <Heading>{resource.name}</Heading>
          <p>{resource.description}</p>
          <p className="why">
            <b>Por que recomendo:</b> {resource.reason}
          </p>
          <div className="res__foot">
            <div className="chips">
              {resource.tags.map((tag) => (
                <span className="cl-tag cl-tag--topic" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <a className="cl-btn cl-btn--link" href={resource.href} target="_blank" rel="noreferrer">
              Visitar <ArrowIcon />
              <span className="sr-only"> {resource.name} (abre em nova aba)</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
