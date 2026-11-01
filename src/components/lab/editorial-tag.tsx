import Link from "next/link";

import { cn } from "@/lib/utils";

const editoriaClass: Record<string, string> = {
  "sql-server": "ed-sqlserver",
  azure: "ed-azure",
  python: "ed-python",
  csharp: "ed-csharp",
  carreira: "ed-carreira",
};

export function edClass(categorySlug: string) {
  return editoriaClass[categorySlug] ?? "";
}

/** Rótulo de editoria com ponto de cor. Variantes: texto, chip e tópico. */
export function EditorialTag({
  label,
  categorySlug,
  href,
  variant = "text",
}: {
  label: string;
  categorySlug?: string;
  href?: string;
  variant?: "text" | "chip" | "topic";
}) {
  const className = cn(
    "cl-tag",
    categorySlug && edClass(categorySlug),
    variant !== "text" && `cl-tag--${variant}`,
  );

  return href ? (
    <Link className={className} href={href}>
      {label}
    </Link>
  ) : (
    <span className={className}>{label}</span>
  );
}
