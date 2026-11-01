"use client";

import { type ComponentPropsWithoutRef, useRef, useState } from "react";

import { CheckIcon, CopyIcon } from "@/components/lab/icons";

const languageLabel: Record<string, string> = {
  sql: "T-SQL",
  tsql: "T-SQL",
  python: "Python",
  py: "Python",
  csharp: "C#",
  cs: "C#",
  bash: "Terminal",
  sh: "Terminal",
  powershell: "PowerShell",
  json: "JSON",
  ts: "TypeScript",
  tsx: "TypeScript",
};

/** Bloco de código: barra com linguagem e botão de copiar. Substitui o <pre> do MDX. */
export function CodeBlock(props: ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = props["data-language"];
  const label = language ? (languageLabel[language] ?? language.toUpperCase()) : "Código";

  const copy = async () => {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ""));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="cl-code">
      <div className="cl-code__bar">
        <span>{label}</span>
        <button className="cl-code__copy" type="button" onClick={copy}>
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          {copied ? "Copiado" : "Copiar"}
          <span className="sr-only" aria-live="polite">
            {copied ? "Código copiado" : ""}
          </span>
        </button>
      </div>
      <pre ref={preRef} {...props} />
    </div>
  );
}
