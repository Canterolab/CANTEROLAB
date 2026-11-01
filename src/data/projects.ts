export type ProjectStatus = "planejado" | "em-andamento" | "concluido";

export type ProjectStep = { label: "Problema" | "Abordagem" | "Resultado"; text: string };

export type Project = {
  slug: string;
  title: string;
  /** Tipo do estudo de caso (ex.: "Inventário de TI"). Vazio = ainda sem descrição. */
  kind?: string;
  description?: string;
  steps: ProjectStep[];
  status?: ProjectStatus;
  stack: string[];
  /** Imagem padronizada 16:10 em public/images/projects/<slug>@1x|@2x.(webp|avif). */
  image: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "atlas",
    title: "Atlas",
    kind: "Inventário de TI",
    description:
      "Portal para controlar o parque de equipamentos de TI, da requisição à entrega com termo de responsabilidade assinado.",
    steps: [
      {
        label: "Problema",
        text: "Controle do parque de equipamentos de TI espalhado em planilhas e e-mails.",
      },
      {
        label: "Abordagem",
        text: "Portal com requisição, aprovação e entrega com termo de responsabilidade assinado.",
      },
    ],
    status: "em-andamento",
    stack: ["SQL Server", "Python", "Flask"],
    image: "atlas",
  },
  {
    slug: "zenvik",
    title: "Zenvik",
    steps: [],
    stack: [],
    image: "zenvik",
  },
  {
    slug: "orbitcx",
    title: "OrbitCX",
    steps: [],
    stack: [],
    image: "orbitcx",
  },
  {
    slug: "argos-security",
    title: "Argos Security",
    kind: "Segurança",
    description:
      "Auditoria de segurança e integridade de projetos Python, SQL Server e IA antes do deploy.",
    steps: [
      {
        label: "Problema",
        text: "Código e scripts SQL indo para produção sem uma revisão de segurança padronizada.",
      },
      {
        label: "Abordagem",
        text: "Auditoria automática de projetos Python, SQL Server e IA antes do deploy.",
      },
    ],
    status: "em-andamento",
    stack: ["Python", "SQL Server", "IA"],
    image: "argos-security",
  },
];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  planejado: "Planejado",
  "em-andamento": "Em andamento",
  concluido: "Concluído",
};
