import { PageIntro } from "@/components/lab/page-intro";
import { labEntries, labStatus } from "@/data/lab";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Lab",
  description: "Experimentos, estudos e projetos em andamento no CanteroLab.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <>
      <PageIntro
        label="Experimentos em processo"
        title="Bancada do"
        highlight="Lab"
        description="Nem tudo começa pronto para virar projeto ou artigo. Aqui ficam os testes, as perguntas e o que ainda estou tentando entender."
      />
      <section className="sec wrap" aria-label="Experimentos">
        <ol className="lab-list">
          {labEntries.map((entry, index) => (
            <li className="lab-row" key={entry.title}>
              <span className="lab-row__n" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="cl-label">{entry.detail}</span>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
              </div>
              <span className={`cl-status lab-status--${entry.status}`}>
                {labStatus[entry.status].label}
              </span>
            </li>
          ))}
        </ol>
      </section>
      <div className="foot-gap" />
    </>
  );
}
