import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { Article } from "@/lib/articles";

export type CoverSources = {
  avif: string;
  webp: string;
  fallback: string;
};

const coversDirectory = path.join(process.cwd(), "public", "images", "covers");

/**
 * Capas geradas a partir do modelo do Lab (1200x630).
 * Arquivos esperados em public/images/covers/<slug>-<variante>@1x|@2x.(webp|avif),
 * onde variante = "card" (sem título, para os cards) ou "og" (com título, Open Graph).
 */
export function getCover(
  article: Article,
  variant: "card" | "og" = "card",
): CoverSources | undefined {
  const base = `${article.slug}-${variant}`;
  if (!fs.existsSync(path.join(coversDirectory, `${base}@1x.webp`))) return undefined;

  const url = (file: string) => `/images/covers/${file}`;
  return {
    avif: `${url(`${base}@1x.avif`)} 1x, ${url(`${base}@2x.avif`)} 2x`,
    webp: `${url(`${base}@1x.webp`)} 1x, ${url(`${base}@2x.webp`)} 2x`,
    fallback: url(`${base}@1x.webp`),
  };
}

export function getOgImage(article: Article): string | undefined {
  const file = `${article.slug}-og@1x.png`;
  return fs.existsSync(path.join(coversDirectory, file))
    ? `/images/covers/${file}`
    : undefined;
}
