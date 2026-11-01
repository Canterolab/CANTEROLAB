import "server-only";

import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

import type { Article } from "@/lib/articles";

export type TocItem = { id: string; title: string };

const IGNORED = new Set(["sumario", "conteudo"]);
const plain = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "");

/** Lê os H2 do MDX e gera os mesmos ids do rehype-slug. */
export function getArticleToc(article: Article): TocItem[] {
  const file = path.join(
    process.cwd(),
    "content",
    "articles",
    article.categorySlug,
    `${article.slug}.mdx`,
  );
  if (!fs.existsSync(file)) return [];

  const source = fs
    .readFileSync(file, "utf8")
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, "");
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const line of source.split("\n")) {
    const heading = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!heading) continue;

    const title = heading[2].replace(/[*_`]/g, "");
    const id = slugger.slug(title);
    if (heading[1] === "##" && !IGNORED.has(plain(id))) items.push({ id, title });
  }

  return items;
}
