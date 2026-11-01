import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CanteroLab",
    short_name: "CanteroLab",
    description:
      "Código, dados e experiências do dia a dia em um laboratório pessoal.",
    start_url: "/",
    display: "standalone",
    background_color: "#070A0F",
    theme_color: "#070A0F",
    lang: "pt-BR",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
