import Link from "next/link";

import { edClass } from "@/components/lab/editorial-tag";
import type { Article } from "@/lib/articles";
import { ARTICLE_CATEGORIES } from "@/lib/article-schema";
import { cn } from "@/lib/utils";

/** Filtro por editoria (chips com contagem). */
export function CategoryNav({
  articles,
  current,
}: {
  articles: Article[];
  current?: string;
}) {
  const items = ARTICLE_CATEGORIES.map((category) => ({
    ...category,
    count: articles.filter((article) => article.categorySlug === category.slug).length,
  })).filter((category) => category.count > 0);

  return (
    <nav className="chips" aria-label="Filtrar por editoria">
      <Link
        className={cn("cl-tag cl-tag--chip", !current && "is-current")}
        href="/artigos"
        aria-current={!current ? "page" : undefined}
      >
        Todos <span className="count">{articles.length}</span>
      </Link>
      {items.map((category) => (
        <Link
          key={category.slug}
          className={cn(
            "cl-tag cl-tag--chip",
            edClass(category.slug),
            current === category.slug && "is-current",
          )}
          href={`/artigos/${category.slug}`}
          aria-current={current === category.slug ? "page" : undefined}
        >
          {category.label} <span className="count">{category.count}</span>
        </Link>
      ))}
    </nav>
  );
}
