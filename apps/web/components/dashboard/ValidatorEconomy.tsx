"use client";

export function ValidatorEconomy() {
  const rewards = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Per-Check Rewards",
      description:
        "Earn tokens for every uptime check you perform. The more active your node is, the more you earn. Payouts are calculated per successful ping reported to the hub.",
      accent: "from-blue-500 to-cyan-500",
      badge: "~0.001 SOL / check",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Accuracy Bonuses",
      description:
        "Validators who consistently report accurate consensus results receive bonus multipliers. Your uptime accuracy score is tracked and directly boosts your earnings.",
      accent: "from-emerald-500 to-teal-500",
      badge: "Up to 3× multiplier",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Uptime Streak Rewards",
      description:
        "Keep your validator node running continuously. The longer your streak without downtime, the higher your reward tier. Rewards compound with consistent availability.",
      accent: "from-violet-500 to-purple-500",
      badge: "Streak: +20% weekly",
    },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Validator Economy
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl transition-colors duration-300">
            How Validators Get Paid
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
            Run a node, earn real rewards. Our token-incentive model ensures validators are fairly compensated for securing the network.
          </p>
        </div>

        {/* Reward cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
          {rewards.map((r) => (
            <div
              key={r.title}
              className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-all hover:-translate-y-1 duration-300"
            >
              {/* Subtle gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${r.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${r.accent} text-white shadow-lg`}>
                {r.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-6">
                {r.description}
              </p>
              <div className="mt-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] px-4 py-2.5 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
                {r.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Payout flow diagram */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-colors duration-300">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 text-center transition-colors duration-300">
            Reward Payout Flow
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {[
              { label: "Your Node Pings", icon: "📡", sub: "Every 3 min" },
              { label: "Hub Validates", icon: "🔗", sub: "Consensus check" },
              { label: "Score Updated", icon: "📊", sub: "Accuracy tracked" },
              { label: "Tokens Sent", icon: "💸", sub: "On-chain payout" },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-colors duration-300">{step.label}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{step.sub}</p>
                </div>
                {i < arr.length - 1 && (
                  <svg className="hidden sm:block h-5 w-5 shrink-0 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
