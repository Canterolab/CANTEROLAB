import { PageIntro } from "@/components/lab/page-intro";
import { LabProjectCard } from "@/components/lab/project-card";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projetos do Lab",
  description: "Experimentos e estudos de caso do CanteroLab: o problema e a abordagem de cada um.",
  path: "/projetos",
});

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        label="Projetos do Lab"
        title="Estudos de caso do"
        highlight="laboratório"
        description="Construções maiores, contadas pelo problema que resolvem e pela abordagem escolhida."
      />
      <section className="sec wrap" aria-label="Projetos">
        <div className="grid-2">
          {projects.map((project) => (
            <LabProjectCard key={project.slug} project={project} headingLevel={2} />
          ))}
        </div>
      </section>
      <div className="foot-gap" />
    </>
  );
}
