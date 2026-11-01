const configuredUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name: "CANTEROLAB_",
  shortName: "CanteroLab",
  author: "Alef Cantero",
  title: "CanteroLab — Banco de dados, cloud e código, investigados a fundo",
  description:
    "Um laboratório pessoal sobre SQL Server, banco de dados, Python, C#, .NET, automação e tudo o que aparece pelo caminho.",
  url: siteUrl,
  locale: "pt_BR",
  nav: [
    { label: "Home", href: "/" },
    { label: "Artigos", href: "/artigos" },
    { label: "Lab", href: "/lab" },
    { label: "Projetos", href: "/projetos" },
    { label: "Certificações", href: "/certificacoes" },
    { label: "Recursos", href: "/recursos" },
    { label: "Sobre", href: "/sobre" },
  ],
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/DBCantero",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://www.linkedin.com/in/alef-cantero-5b9916158",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
    email: `mailto:${process.env.NEXT_PUBLIC_EMAIL || "alefcantero_@hotmail.com"}`,
  },
  authorBio:
    "Tech Lead em ERP/PDV para varejo, com 8+ anos de SQL Server. Escrevo aqui o que estudo e testo sobre dados, cloud e automação.",
  authorStack: ["SQL Server", "Azure SQL", "T-SQL", "Python", "C# / .NET"],
  authorPhoto: "/images/authors/alef-cantero.webp",
} as const;
