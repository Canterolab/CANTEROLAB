import Link from "next/link";

import { EditorialTag, edClass } from "@/components/lab/editorial-tag";
import type { Article } from "@/lib/articles";
import { type CoverSources, getCover } from "@/lib/covers";
import { cn, formatDate } from "@/lib/utils";

type HeadingLevel = 2 | 3;

function Cover({
  article,
  cover,
  priority = false,
  sizes,
}: {
  article: Article;
  cover?: CoverSources;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <Link
      className={cn(
        "cl-card__cover",
        !cover && "cl-card__cover--placeholder",
        edClass(article.categorySlug),
      )}
      href={article.href}
      tabIndex={-1}
      aria-hidden="true"
    >
      {cover ? (
        <picture>
          <source type="image/avif" srcSet={cover.avif} sizes={sizes} />
          <source type="image/webp" srcSet={cover.webp} sizes={sizes} />
          {/* Capas já otimizadas em AVIF/WebP @1x/@2x. */}
          <img
            src={cover.fallback}
            alt=""
            width={1200}
            height={630}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
          />
        </picture>
      ) : null}
    </Link>
  );
}

function Meta({ article }: { article: Article }) {
  return (
    <div className="cl-meta">
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span className="sep" aria-hidden="true">
        ·
      </span>
      <span>{article.readingTime}</span>
    </div>
  );
}

function Title({
  article,
  level,
}: {
  article: Article;
  level: HeadingLevel;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Heading className="cl-card__title">
      <Link href={article.href}>{article.title}</Link>
    </Heading>
  );
}

/** Card de artigo nas variantes destaque, padrão e compacto. */
export function ArticleCard({
  article,
  variant = "default",
  headingLevel = 3,
  showDescription = true,
  showTag = true,
  rank,
  priority,
}: {
  article: Article;
  variant?: "featured" | "default" | "compact";
  headingLevel?: HeadingLevel;
  showDescription?: boolean;
  showTag?: boolean;
  rank?: number;
  priority?: boolean;
}) {
  const tag = showTag ? (
    <EditorialTag label={article.category} categorySlug={article.categorySlug} />
  ) : null;

  if (variant === "featured") {
    return (
      <article className="cl-card cl-card--featured">
        <Cover
          article={article}
          cover={getCover(article)}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 700px"
        />
        <div className="cl-card__body">
          <span className="cl-label cl-label--accent">Em destaque</span>
          {tag}
          <Title article={article} level={headingLevel} />
          <p className="cl-card__dek">{article.description}</p>
          <Meta article={article} />
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="cl-card cl-card--compact">
        {rank ? (
          <span className="cl-card__num" aria-hidden="true">
            {rank}
          </span>
        ) : null}
        <div className="cl-card__body">
          {tag}
          <Title article={article} level={headingLevel} />
          <Meta article={article} />
        </div>
      </article>
    );
  }

  return (
    <article className="cl-card cl-card--default">
      <Cover
        article={article}
        cover={getCover(article)}
        priority={priority}
        sizes="(max-width: 760px) 100vw, (max-width: 1024px) 50vw, 400px"
      />
      {tag}
      <Title article={article} level={headingLevel} />
      {showDescription ? <p className="cl-card__dek">{article.description}</p> : null}
      <Meta article={article} />
    </article>
  );
}
