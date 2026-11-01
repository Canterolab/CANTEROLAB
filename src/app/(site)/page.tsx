import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/lab/article-card";
import { EditorialTag } from "@/components/lab/editorial-tag";
import { SectionHead } from "@/components/lab/section-head";
import { maisLidos } from "@/config/home";
import { siteConfig } from "@/config/site";
import { ARTICLE_CATEGORIES } from "@/lib/article-schema";
import { type Article, getAllArticles } from "@/lib/articles";

function pickPopular(articles: Article[], exclude: string, limit: number) {
  const curated = maisLidos
    .map((href) => articles.find((article) => article.href === href))
    .filter((article): article is Article => Boolean(article));
  const pool = curated.length ? curated : articles.filter((a) => a.href !== exclude);
  return pool.slice(0, limit);
}

function topTopics(articles: Article[], limit = 12) {
  const counts = new Map<string, { label: string; categorySlug: string; count: number }>();
  for (const article of articles) {
    for (const tag of article.tags) {
      const key = tag.toLocaleLowerCase("pt-BR");
      const current = counts.get(key);
      if (current) current.count += 1;
      else counts.set(key, { label: tag, categorySlug: article.categorySlug, count: 1 });
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, limit);
}

export default function Home() {
  const articles = getAllArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.filter((article) => article !== featured).slice(0, 6);
  const popular = pickPopular(articles, featured?.href ?? "", 5);
  const topics = topTopics(articles);
  const editorias = ARTICLE_CATEGORIES.map((category) => ({
    ...category,
    articles: articles.filter((article) => article.categorySlug === category.slug),
  }))
    .filter((category) => category.articles.length > 0)
    .slice(0, 3);

  return (
    <>
      <section className="wrap hero-intro" aria-labelledby="home-title">
        <span className="cl-label cl-label--accent cl-rise">{"// CanteroLab · blog de estudos"}</span>
        <h1 id="home-title" className="cl-rise d1">
          Banco de dados, cloud e código,{" "}
          <span className="grad-text">investigados a fundo.</span>
        </h1>
        <p className="cl-rise d2">
          Artigos e anotações de quem resolve problemas de SQL Server, Azure, Python e C# no
          dia a dia.
        </p>
      </section>

      {featured ? (
        <section className="hero wrap cl-rise d3" aria-label="Artigo em destaque">
          <ArticleCard article={featured} variant="featured" headingLevel={2} priority />
        </section>
      ) : (
        <section className="wrap">
          <p className="cl-empty">Os primeiros artigos estão a caminho.</p>
        </section>
      )}

      {latest.length || popular.length ? (
        <section className="sec wrap">
          <div className="g-home">
            <div className="g-latest">
              <SectionHead id="ultimas" title="Últimas publicações" href="/artigos" />
              {latest.length ? (
                <div className="grid-2">
                  {latest.map((article) => (
                    <ArticleCard key={article.href} article={article} />
                  ))}
                </div>
              ) : (
                <p className="cl-empty">Novos artigos aparecem aqui.</p>
              )}
            </div>
            <aside className="g-side" aria-label="Mais lidos e tópicos">
              {popular.length ? (
                <div>
                  <SectionHead title="Mais lidos" />
                  {popular.map((article, index) => (
                    <ArticleCard
                      key={article.href}
                      article={article}
                      variant="compact"
                      rank={index + 1}
                    />
                  ))}
                </div>
              ) : null}
              {topics.length ? (
                <div>
                  <SectionHead title="Tópicos" />
                  <div className="chips">
                    {topics.map((topic) => (
                      <EditorialTag
                        key={topic.label}
                        label={topic.label}
                        categorySlug={topic.categorySlug}
                        href={`/artigos/${topic.categorySlug}`}
                        variant="chip"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      ) : null}

      {editorias.length ? (
        <section className="sec wrap" aria-label="Por editoria">
          <div className="grid-3">
            {editorias.map((editoria) => {
              const [main, ...rest] = editoria.articles;
              return (
                <div className="edblock" key={editoria.slug}>
                  <SectionHead title={editoria.label} href={`/artigos/${editoria.slug}`} />
                  <ArticleCard article={main} showDescription={false} />
                  {rest.slice(0, 2).map((article) => (
                    <ArticleCard
                      key={article.href}
                      article={article}
                      variant="compact"
                      showTag={false}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="sec wrap" aria-label="Quem escreve">
        <div className="strip">
          <Image
            src={siteConfig.authorPhoto}
            alt={`Foto de ${siteConfig.author}`}
            width={72}
            height={72}
            sizes="72px"
          />
          <p>
            <b>Quem escreve:</b> {siteConfig.author}, Tech Lead em ERP/PDV para varejo e 8+ anos
            de SQL Server. O Lab reúne o que estudo, testo e aplico no dia a dia.
          </p>
          <Link className="cl-btn cl-btn--link" href="/sobre">
            Sobre o autor
          </Link>
        </div>
      </section>
      <div className="foot-gap" />
    </>
  );
}
