"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";

export function CtaSection() {
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="my-16 flex justify-center">
      <div
        ref={ref}
        className="reveal-scale relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-12 text-center md:pb-20 md:pt-16 md:px-24 mx-auto w-full max-w-4xl shadow-xl transition-colors duration-300 border-glow"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_60%)]" />

        {/* Scan line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="relative z-10">
          <div className="mb-5 inline-flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-zinc-900 dark:bg-white shadow-lg">
            <svg className="h-7 w-7 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white md:text-4xl transition-colors duration-300">
            Ready to secure your uptime?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Join thousands of developers relying on decentralized infrastructure for absolute certainty.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new Event("trigger-login-modal"))}
              className="group relative flex items-center gap-2.5 rounded-xl bg-zinc-900 dark:bg-white px-8 py-3.5 text-base font-semibold text-white dark:text-zinc-900 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(37,99,235,0.3)] focus:outline-none cursor-pointer overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              Add your first website
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
              <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Free to start, no credit card needed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}