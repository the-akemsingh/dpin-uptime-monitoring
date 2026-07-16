"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Add Your Website",
    description:
      "Sign in and paste your website URL into the dashboard. No config files, no agents to install — just one field and you're monitored.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Validators Monitor Globally",
    description:
      "Thousands of independent validator nodes distributed worldwide ping your site every few minutes from different regions simultaneously.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Consensus & Alert",
    description:
      "When a majority of validators agree your site is down, the network reaches consensus and fires instant alerts to your preferred channel.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const step0Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const step1Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const step2Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const stepRefs = [step0Ref, step1Ref, step2Ref];

  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="reveal mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 shadow-sm">
            <svg className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            How It Works
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl transition-colors duration-300">
            Zero single points of failure
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
            A consensus-driven approach that eliminates false positives and ensures you only get alerted when your site is truly down.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px bg-gradient-to-r from-zinc-200 via-blue-300 to-zinc-200 dark:from-zinc-800 dark:via-blue-700 dark:to-zinc-800" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={stepRefs[i]}
                className={`reveal group relative flex flex-col items-center text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg card-hover transition-colors duration-300 stagger-${i + 1}`}
              >
                {/* Number circle */}
                <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-extrabold text-white shadow-sm">
                    {step.number.slice(1)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
