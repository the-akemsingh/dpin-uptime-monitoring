"use client";

const steps = [
  {
    number: "01",
    title: "Sign Up & Register",
    description:
      "Create an account on Pingsy. Once registered, navigate to the Validator section in your dashboard and submit a validator registration request.",
    detail: "Takes ~2 minutes",
    color: "blue",
  },
  {
    number: "02",
    title: "Setup Your Node",
    description:
      "Download the validator script or Docker image. Configure your API key from the dashboard and run the node on any machine with a stable internet connection.",
    detail: "Any VPS or home server",
    color: "emerald",
  },
  {
    number: "03",
    title: "Start Earning",
    description:
      "Your node begins pinging registered websites and reporting results to the hub. Rewards are tallied in real-time and distributed on-chain.",
    detail: "Payouts every 30 days",
    color: "violet",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  blue: {
    border: "border-blue-200 dark:border-blue-800/50",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  },
  emerald: {
    border: "border-emerald-200 dark:border-emerald-800/50",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  },
  violet: {
    border: "border-violet-200 dark:border-violet-800/50",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    text: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
  },
};

export function BecomeValidator() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-900/20 px-4 py-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Join the Network
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl transition-colors duration-300">
            Become a Validator
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
            Anyone with a server and internet connection can join our validator network and start earning. Three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-[calc(66%-4rem)] h-px bg-gradient-to-r from-blue-300 via-emerald-300 to-violet-300 dark:from-blue-800 dark:via-emerald-800 dark:to-violet-800" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((step) => {
              const c = colorMap[step.color]!;
              return (
                <div
                  key={step.number}
                  className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-all hover:-translate-y-1 duration-300"
                >
                  {/* Step number badge */}
                  <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${c.border} ${c.bg}`}>
                    <span className={`text-lg font-extrabold ${c.text}`}>{step.number}</span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-6">
                    {step.description}
                  </p>

                  <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${c.badge} transition-colors duration-300`}>
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-colors duration-300">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 transition-colors duration-300">
            Minimum Requirements
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "RAM", value: "512 MB", icon: "🧠" },
              { label: "CPU", value: "1 vCPU", icon: "⚙️" },
              { label: "Network", value: "10 Mbps", icon: "📶" },
              { label: "OS", value: "Linux / macOS / Windows", icon: "💻" },
            ].map((req) => (
              <div key={req.label} className="flex flex-col items-center rounded-lg border border-zinc-100 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] p-4 text-center transition-colors duration-300">
                <span className="text-2xl mb-2">{req.icon}</span>
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
