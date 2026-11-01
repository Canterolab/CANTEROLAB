import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@/styles/lab-tokens.css";
import "@/styles/lab.css";

import { NeuralBackground } from "@/components/lab/neural-background";
import { SiteFooter } from "@/components/lab/site-footer";
import { type NavItem, SiteHeader } from "@/components/lab/site-header";
import { getAllArticles } from "@/lib/articles";
import { ARTICLE_CATEGORIES } from "@/lib/article-schema";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const articles = getAllArticles();
  const withArticles = new Set(articles.map((article) => article.categorySlug));
  const editorias: NavItem[] = ARTICLE_CATEGORIES.filter((category) =>
    withArticles.has(category.slug),
  ).map((category) => ({
    label: category.label,
    href: `/artigos/${category.slug}`,
  }));
  const searchIndex = articles.map((article) => ({
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags,
    href: article.href,
  }));

  return (
    <div className="cl">
      <a className="cl-skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <NeuralBackground />
      <div className="cl-layer">
        <SiteHeader editorias={editorias} searchIndex={searchIndex} />
        <main id="conteudo">{children}</main>
        <SiteFooter editorias={editorias} />
      </div>
    </div>
  );
}
