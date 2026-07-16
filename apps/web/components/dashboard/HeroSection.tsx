"use client";

import { useEffect, useRef } from "react";
import { StatusBadge } from "./StatusBadge";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Staggered entrance — runs once on mount
  useEffect(() => {
    const items = [badgeRef, headingRef, subRef, ctaRef];
    items.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(36px)";
      el.style.transition = `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 60);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative pt-28 pb-20 text-center lg:pt-40 lg:pb-32 overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-blue-600/[0.08] dark:bg-blue-500/[0.12] blur-[120px] animate-blob" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] rounded-full bg-zinc-400/[0.06] dark:bg-zinc-600/[0.1] blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute top-10 right-1/4 w-[250px] h-[250px] rounded-full bg-zinc-500/[0.06] dark:bg-zinc-700/[0.08] blur-[80px] animate-blob animation-delay-4000" />
      </div>

      {/* Horizontal scan line accent */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-10" />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        {/* Status badge */}
        <div ref={badgeRef} className="mb-8 flex justify-center">
          <StatusBadge />
        </div>

        {/* Headline */}
        <h1
          ref={headingRef}
          className="text-[3rem] leading-[1.08] font-black tracking-[-0.03em] text-zinc-900 dark:text-white lg:text-[4.5rem] transition-colors duration-300"
        >
          Decentralized Uptime{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-blue-600 to-zinc-900 dark:from-white dark:via-blue-400 dark:to-zinc-400">
              Monitoring
            </span>
            {/* Underline accent */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
          </span>
          <br className="hidden sm:block" />
          <span className="text-zinc-500 dark:text-zinc-500"> for Modern Infrastructure</span>
        </h1>

        {/* Sub-heading */}
        <p
          ref={subRef}
          className="mx-auto mt-7 max-w-2xl text-[1.1rem] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium"
        >
          Ensure 100% reliability. Our global network of decentralized validators
          monitors your endpoints from every corner of the internet — eliminating
          false positives and single points of failure.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => window.dispatchEvent(new Event("trigger-login-modal"))}
            className="group relative flex items-center gap-2.5 rounded-xl bg-zinc-900 dark:bg-white px-8 py-3.5 text-base font-semibold text-white dark:text-zinc-900 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(37,99,235,0.35)] focus:outline-none cursor-pointer overflow-hidden"
          >
            {/* Shimmer */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Add your first website
          </button>

          <a
            href="#how-it-works"
            className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
          >
            See how it works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 border-t border-zinc-200 dark:border-zinc-800/80 pt-10">
          {[
            { value: "10,000+", label: "Validator Nodes" },
            { value: "120+", label: "Countries" },
            { value: "99.99%", label: "Uptime Accuracy" },
            { value: "<1s", label: "Alert Latency" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
