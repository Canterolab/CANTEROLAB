"use client";

import { useEffect, useState } from "react";

/** Barra de progresso de leitura colada no header, medindo o elemento alvo. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const total = rect.height - window.innerHeight * 0.6;
        const read = Math.min(Math.max(-rect.top + 120, 0), Math.max(total, 1));
        setProgress(Math.round((read / Math.max(total, 1)) * 100));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <div
      className="cl-progress cl-progress--fixed"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Progresso de leitura"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    />
  );
}
