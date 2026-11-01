import { ArticleCard } from "@/components/lab/article-card";
import { CategoryNav } from "@/components/lab/category-nav";
import { PageIntro } from "@/components/lab/page-intro";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Artigos",
  description:
    "Registros técnicos sobre SQL Server, Azure, Python, C#, .NET e automação.",
  path: "/artigos",
});

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <PageIntro
        label="Blog de estudos"
        title="Todos os"
        highlight="artigos"
        description="Problemas que apareceram, hipóteses que não funcionaram e o que aprendi enquanto tentava entender melhor cada assunto."
      >
        <CategoryNav articles={articles} />
      </PageIntro>
      <section className="sec wrap" aria-label="Lista de artigos">
        {articles.length ? (
          <div className="grid-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.href} article={article} headingLevel={2} priority={index < 3} />
            ))}
          </div>
        ) : (
          <p className="cl-empty">Os primeiros artigos estão a caminho.</p>
        )}
      </section>
      <div className="foot-gap" />
    </>
  );
}
