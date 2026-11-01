import { ImageResponse } from "next/og";

export const alt = "CanteroLab — Banco de dados, cloud e código, investigados a fundo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 10%, rgba(232,121,249,0.28), transparent 45%), radial-gradient(circle at 0% 100%, rgba(34,211,238,0.22), transparent 45%), linear-gradient(135deg, #050816, #0F172A)",
          color: "#F1F5F9",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #1C2638",
            paddingBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
              <path
                d="M30.5 14.5a17.5 17.5 0 1 0 0 35"
                stroke="#F4F7FA"
                strokeLinecap="round"
                strokeWidth="6.5"
              />
              <path
                d="M38 14.5v30h15"
                stroke="#F4F7FA"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6.5"
              />
              <path
                d="M47 52.5h11"
                stroke="#22D3EE"
                strokeLinecap="round"
                strokeWidth="4.5"
              />
            </svg>
            <span style={{ fontSize: 25, fontWeight: 700, letterSpacing: "0.11em" }}>
              CANTEROLAB
            </span>
          </div>
          <span style={{ color: "#94A3B8", fontFamily: "monospace", fontSize: 18 }}>
            cantero@lab:~
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <span
            style={{
              color: "#22D3EE",
              fontFamily: "monospace",
              fontSize: 19,
              marginBottom: 18,
            }}
          >
            $ whoami
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 650,
              letterSpacing: "-0.045em",
              lineHeight: 1.08,
            }}
          >
            Banco de dados, cloud e código, investigados a fundo.
          </span>
        </div>

        <div style={{ display: "flex", gap: 14, color: "#CBD5E1", fontSize: 19 }}>
          <span>SQL Server</span>
          <span style={{ color: "#334155" }}>/</span>
          <span>Python</span>
          <span style={{ color: "#334155" }}>/</span>
          <span>C#</span>
          <span style={{ color: "#334155" }}>/</span>
          <span>.NET</span>
        </div>
      </div>
    ),
    size,
  );
}
