"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";

const rewards = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Per-Check Rewards",
    description:
      "Earn tokens for every uptime check you perform. The more active your node is, the more you earn. Payouts are calculated per successful ping reported to the hub.",
    badge: "~0.001 SOL / check",
    number: "01",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Accuracy Bonuses",
    description:
      "Validators who consistently report accurate consensus results receive bonus multipliers. Your uptime accuracy score is tracked and directly boosts your earnings.",
    badge: "Up to 3× multiplier",
    number: "02",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Uptime Streak Rewards",
    description:
      "Keep your validator node running continuously. The longer your streak without downtime, the higher your reward tier. Rewards compound with consistent availability.",
    badge: "Streak: +20% weekly",
    number: "03",
  },
];

const flowSteps = [
  { label: "Your Node Pings", sub: "Every 3 min" },
  { label: "Hub Validates", sub: "Consensus check" },
  { label: "Score Updated", sub: "Accuracy tracked" },
  { label: "Tokens Sent", sub: "On-chain payout" },
];

export function ValidatorEconomy() {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const card0Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const card1Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const card2Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const flowRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const cardRefs = [card0Ref, card1Ref, card2Ref];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="reveal mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Validator Economy
          </div>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-4xl transition-colors duration-300">
            How Validators Get Paid
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
            Run a node, earn real rewards. Our token-incentive model ensures validators are fairly compensated for securing the network.
          </p>
        </div>

        {/* Reward cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10">
          {rewards.map((r, i) => (
            <div
              key={r.title}
              ref={cardRefs[i]}
              className={`reveal group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg card-hover transition-colors duration-300 stagger-${i + 1}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-zinc-500/0 group-hover:from-blue-500/5 group-hover:to-zinc-500/5 transition-all duration-500 pointer-events-none" />

              {/* Step number */}
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-md">
                  {r.icon}
                </div>
                <span className="font-mono text-4xl font-black text-zinc-100 dark:text-zinc-800 select-none">
                  {r.number}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-6">
                {r.description}
              </p>
              <div className="mt-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] px-4 py-2.5 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
                {r.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Payout flow diagram */}
        <div
          ref={flowRef}
          className="reveal rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-colors duration-300"
        >
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-8 text-center tracking-tight transition-colors duration-300">
            Reward Payout Flow
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-sm font-bold shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-colors duration-300">{step.label}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{step.sub}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <svg className="hidden sm:block h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
