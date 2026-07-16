"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Sign Up & Register",
    description:
      "Create an account on Pingsy. Once registered, navigate to the Validator section in your dashboard and submit a validator registration request.",
    detail: "Takes ~2 minutes",
  },
  {
    number: "02",
    title: "Setup Your Node",
    description:
      "Download the validator script or Docker image. Configure your API key from the dashboard and run the node on any machine with a stable internet connection.",
    detail: "Any VPS or home server",
  },
  {
    number: "03",
    title: "Start Earning",
    description:
      "Your node begins pinging registered websites and reporting results to the hub. Rewards are tallied in real-time and distributed on-chain.",
    detail: "Payouts every 30 days",
  },
];

const requirements = [
  { label: "RAM", value: "512 MB" },
  { label: "CPU", value: "1 vCPU" },
  { label: "Network", value: "10 Mbps" },
  { label: "OS", value: "Linux / macOS / Win" },
];

export function BecomeValidator() {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const step0Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const step1Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const step2Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const reqRef   = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const stepRefs = [step0Ref, step1Ref, step2Ref];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="reveal mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 shadow-sm">
            <svg className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Join the Network
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl transition-colors duration-300">
            Become a Validator
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
            Anyone with a server and internet connection can join our validator network and start earning. Three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-10">
          <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-[calc(66%-4rem)] h-px bg-gradient-to-r from-zinc-200 via-blue-300 to-zinc-200 dark:from-zinc-800 dark:via-blue-700 dark:to-zinc-800" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={stepRefs[i]}
                className={`reveal group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg card-hover transition-colors duration-300 stagger-${i + 1} overflow-hidden`}
              >
                {/* Ghost number bg */}
                <span className="pointer-events-none absolute -right-3 -top-5 text-8xl font-black text-zinc-100 dark:text-zinc-800/60 select-none leading-none">
                  {step.number}
                </span>

                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md text-lg font-extrabold">
                    {step.number}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-6">
                    {step.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] px-3 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div
          ref={reqRef}
          className="reveal rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-colors duration-300"
        >
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
            Minimum Requirements
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {requirements.map((req) => (
              <div
                key={req.label}
                className="flex flex-col items-center rounded-xl border border-zinc-100 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] p-4 text-center transition-colors duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-800 text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                  </svg>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">{req.label}</p>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 transition-colors duration-300">{req.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
