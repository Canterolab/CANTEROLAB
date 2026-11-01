import { PageIntro } from "@/components/lab/page-intro";
import { LabResourceList } from "@/components/lab/resource-list";
import { resources } from "@/data/resources";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Recursos",
  description: "Cursos, livros, ferramentas e documentações recomendados.",
  path: "/recursos",
});

export default function ResourcesPage() {
  return (
    <>
      <PageIntro
        label="Valeu o tempo"
        title="Recursos"
        highlight="recomendados"
        description="Cursos, livros, ferramentas e referências que foram úteis de verdade, com o motivo da recomendação."
      />
      <section className="sec wrap" aria-label="Recursos">
        <LabResourceList resources={resources} />
      </section>
      <div className="foot-gap" />
    </>
  );
}
