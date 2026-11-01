import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/lab/article-card";
import { CategoryNav } from "@/components/lab/category-nav";
import { PageIntro } from "@/components/lab/page-intro";
import { getAllArticles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/metadata";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from(
    new Set(getAllArticles().map((article) => article.categorySlug)),
  ).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const firstArticle = getAllArticles().find(
    (article) => article.categorySlug === category,
  );

  if (!firstArticle) return {};

  return createPageMetadata({
    title: `Artigos de ${firstArticle.category}`,
    description: `Registros e aprendizados sobre ${firstArticle.category}.`,
    path: `/artigos/${category}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allArticles = getAllArticles();
  const articles = allArticles.filter(
    (article) => article.categorySlug === category,
  );

  if (articles.length === 0) notFound();

  return (
    <>
      <PageIntro
        label="Editoria"
        title={articles[0].category}
        description={`Notas, investigações e aprendizados sobre ${articles[0].category}.`}
      >
        <CategoryNav articles={allArticles} current={category} />
      </PageIntro>
      <section className="sec wrap" aria-label={`Artigos de ${articles[0].category}`}>
        <div className="grid-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.href} article={article} headingLevel={2} priority={index < 3} />
          ))}
        </div>
      </section>
      <div className="foot-gap" />
    </>
  );
}
