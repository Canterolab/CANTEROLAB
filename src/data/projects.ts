export type ProjectStatus = "planejado" | "em-andamento" | "concluido";

export type Project = {
  title: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Sentinel MSIT",
    description:
      "Um projeto pessoal para observar instâncias SQL Server e transformar sinais dispersos em contexto útil.",
    status: "em-andamento",
    stack: ["SQL Server", "Python", ".NET"],
  },
  {
    title: "Atlas MSIT",
    description:
      "Um portal para controlar o parque de equipamentos de TI, da requisição à entrega com termo de responsabilidade assinado.",
    status: "em-andamento",
    stack: ["SQL Server", "Python", "Flask"],
  },
];

export const projectStatusLabels: Record<ProjectStatus, string> = {
  planejado: "Planejado",
  "em-andamento": "Em andamento",
  concluido: "Concluído",
};
