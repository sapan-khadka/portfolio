"use client";

import { useEffect, useState } from "react";

/**
 * Soft blurred orbs + a few floating shapes. Stays behind content (fixed, low z-index).
 */
export function FloatingAmbient() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const motion = !reduceMotion;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Large glows */}
      <div
        className={`absolute -left-[20%] top-[-10%] h-[min(520px,90vw)] w-[min(520px,90vw)] rounded-full bg-cyan-400/25 blur-[100px] dark:bg-cyan-500/20 ${motion ? "animate-float" : ""}`}
      />
      <div
        className={`absolute -right-[15%] top-[25%] h-[min(420px,75vw)] w-[min(420px,75vw)] rounded-full bg-blue-500/20 blur-[90px] dark:bg-blue-500/15 ${motion ? "animate-float-delayed" : ""}`}
      />
      <div
        className={`absolute bottom-[-5%] left-[20%] h-[min(360px,60vw)] w-[min(360px,60vw)] rounded-full bg-violet-500/15 blur-[85px] dark:bg-violet-500/12 ${motion ? "animate-float-slow" : ""}`}
      />

      {/* Small floating chips (decorative) */}
      {motion && (
        <>
          <div className="animate-drift absolute left-[8%] top-[38%] h-2 w-2 rounded-full bg-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.6)] dark:bg-cyan-300/50" />
          <div className="animate-drift-reverse absolute right-[12%] top-[48%] h-1.5 w-1.5 rounded-full bg-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
          <div className="animate-drift absolute right-[22%] top-[18%] h-2.5 w-2.5 rotate-45 rounded-sm border border-cyan-400/40 bg-cyan-400/10 dark:border-cyan-400/30" />
        </>
      )}
    </div>
  );
}
