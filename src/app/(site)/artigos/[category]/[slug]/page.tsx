import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Image from "next/image";

import { ArticleCard } from "@/components/lab/article-card";
import { ArticleToc } from "@/components/lab/article-toc";
import { AuthorBox } from "@/components/lab/author-box";
import { EditorialTag } from "@/components/lab/editorial-tag";
import { ReadingProgress } from "@/components/lab/reading-progress";
import { SectionHead } from "@/components/lab/section-head";
import {
  getAllArticles,
  getArticle,
  getRelatedArticles,
  loadArticle,
} from "@/lib/articles";
import { siteConfig } from "@/config/site";
import { getCover, getOgImage } from "@/lib/covers";
import { absoluteUrl } from "@/lib/seo";
import { getArticleToc } from "@/lib/toc";
import { formatDate } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    category: article.categorySlug,
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);

  if (!article) return {};

  const image = article.image ?? getOgImage(article) ?? "/opengraph-image";

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: article.href },
    openGraph: {
      type: "article",
      url: article.href,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updated,
      tags: article.tags,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const loadedArticle = await loadArticle(category, slug);

  if (!loadedArticle) notFound();

  const { article, Content } = loadedArticle;
  const related = getRelatedArticles(article, 3);
  const toc = getArticleToc(article);
  const cover = getCover(article);
  const ogImage = article.image ?? getOgImage(article) ?? "/opengraph-image";
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: absoluteUrl("/sobre"),
      image: absoluteUrl(siteConfig.authorPhoto),
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin].filter(Boolean),
      jobTitle: "Tech Lead",
    },
    mainEntityOfPage: absoluteUrl(article.href),
    url: absoluteUrl(article.href),
    image: absoluteUrl(ogImage),
    inLanguage: "pt-BR",
    articleSection: article.category,
    keywords: article.tags.join(", "),
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <ReadingProgress targetId="artigo" />
      <div className="wrap">
        <header className="a-head">
          <div className="a-crumb">
            <EditorialTag
              label={article.category}
              categorySlug={article.categorySlug}
              href={`/artigos/${article.categorySlug}`}
            />
            {article.tags[0] ? <span className="cl-label">/ {article.tags[0]}</span> : null}
          </div>
          <h1 className="a-title" id="titulo-artigo">{article.title}</h1>
          <p className="a-lede">{article.description}</p>
          <div className="a-by">
            <Image src={siteConfig.authorPhoto} alt="" width={36} height={36} sizes="36px" />
            <b>{siteConfig.author}</b>
            <div className="cl-meta">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.updated ? (
                <>
                  <span className="sep" aria-hidden="true">·</span>
                  <span>
                    atualizado <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                  </span>
                </>
              ) : null}
              <span className="sep" aria-hidden="true">·</span>
              <span>{article.readingTime} de leitura</span>
            </div>
          </div>
        </header>

        {cover ? (
          <figure className="a-cover">
            <picture>
              <source type="image/avif" srcSet={cover.avif} />
              <source type="image/webp" srcSet={cover.webp} />
              {/* Capa já otimizada em AVIF/WebP @1x/@2x. */}
              <img src={cover.fallback} alt="" width={1200} height={630} fetchPriority="high" />
            </picture>
          </figure>
        ) : null}

        <div className="a-grid">
          <ArticleToc items={toc} />
          <article id="artigo" aria-labelledby="titulo-artigo">
            <div className="prose">
              <Content />
            </div>
            <div className="a-tags">
              <span className="cl-label">Tópicos</span>
              {article.tags.map((tag) => (
                <EditorialTag key={tag} label={tag} variant="topic" />
              ))}
            </div>
            <AuthorBox />
          </article>
        </div>
      </div>

      {related.length ? (
        <section className="sec wrap" aria-labelledby="continue">
          <SectionHead
            id="continue"
            title="Continue no Lab"
            href={`/artigos/${article.categorySlug}`}
            linkLabel={`Mais de ${article.category}`}
          />
          <div className="grid-3">
            {related.map((item) => (
              <ArticleCard key={item.href} article={item} showDescription={false} />
            ))}
          </div>
        </section>
      ) : null}
      <div className="foot-gap" />
    </>
  );
}
