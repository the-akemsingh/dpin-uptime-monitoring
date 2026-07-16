"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";

export function FeaturesGrid() {
  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const bannerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const card1Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const card2Ref = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const analyticsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });

  return (
    <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Section label */}
      <div
        ref={headerRef}
        className="reveal mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Platform Features
        </div>
      </div>

      {/* Top Banner Feature */}
      <div
        ref={bannerRef}
        className="reveal-scale relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-12 text-center shadow-lg md:p-20 mb-6 transition-colors duration-300 card-hover border-glow"
      >
        {/* Radial bg */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_65%)]" />
        {/* SVG network lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none pointer-events-none">
          <svg preserveAspectRatio="none" viewBox="0 0 1200 400" className="absolute w-full h-full">
            <path d="M0,200 C300,40 600,360 1200,200" fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" />
            <path d="M0,240 C400,100 800,280 1200,240" fill="none" stroke="rgba(37,99,235,0.3)" strokeWidth="1" />
            <path d="M0,160 C350,300 850,80 1200,160"  fill="none" stroke="rgba(100,100,100,0.2)" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-white shadow-lg">
            <svg className="h-7 w-7 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white md:text-4xl tracking-tight transition-colors duration-300">
            Global Validation Network
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Your services are verified from independent nodes across 120+ countries simultaneously — with cryptographic consensus eliminating false alerts.
          </p>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        {/* Decentralized Network */}
        <div
          ref={card1Ref}
          className="reveal-left group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-colors duration-300 card-hover relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-md">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">Decentralized Network</h3>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-8">
            Leverage 10,000+ globally distributed nodes to verify uptime, bypassing local DNS or regional routing issues.
          </p>
          <div className="mt-auto rounded-xl bg-gray-50 dark:bg-[#0a0a0a] p-4 border border-zinc-200 dark:border-zinc-800/50 font-mono text-xs shadow-inner transition-colors duration-300">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">99.999% Network Reliability</span>
            </div>
          </div>
        </div>

        {/* Instant Alerts */}
        <div
          ref={card2Ref}
          className="reveal-right group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-colors duration-300 card-hover relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zinc-500/5 to-transparent rounded-2xl pointer-events-none" />
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              {["slack", "webhook", "email"].map((ch) => (
                <div key={ch} className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 text-[10px] font-mono uppercase">
                  {ch[0]}
                </div>
              ))}
            </div>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">Instant Alerts</h3>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-8">
            Sub-second notification delivery via Slack, Telegram, Webhooks, or Email the moment consensus determines an outage.
          </p>
          <div className="mt-auto rounded-xl bg-gray-50 dark:bg-[#0a0a0a] p-4 border border-zinc-200 dark:border-zinc-800/50 font-mono text-xs shadow-inner leading-relaxed transition-colors duration-300">
            <div className="flex gap-1 mb-1.5"><span className="text-blue-500">›</span><span className="text-zinc-400">Outage detected: <span className="text-zinc-700 dark:text-zinc-300">api.production.com</span></span></div>
            <div className="flex gap-1 mb-1.5"><span className="text-blue-500">›</span><span className="text-zinc-400">Consensus: 45/50 nodes reporting <span className="text-red-500 font-semibold">DOWN</span></span></div>
            <div className="flex gap-1"><span className="text-blue-500">›</span><span className="text-zinc-400">Firing webhook → <span className="text-zinc-700 dark:text-zinc-300">#ops-alerts</span></span></div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div
        ref={analyticsRef}
        className="reveal rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-lg transition-all duration-300 card-hover grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-md">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">Detailed Analytics</h3>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-6">
            Granular performance data broken down by region, node provider, and connection phase — with P99 latency charts and historical trends.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Real-time data refresh
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/50 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden shadow-inner transition-colors duration-300">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                  <th className="px-5 py-3 text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">Region</th>
                  <th className="px-5 py-3 text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider text-right">Latency</th>
                  <th className="px-5 py-3 text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/40">
                {[
                  { region: "us-east-1", latency: "42ms", up: true },
                  { region: "eu-central", latency: "118ms", up: true },
                  { region: "ap-south",  latency: "205ms", up: true },
                ].map((row) => (
                  <tr key={row.region} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/20 transition-colors duration-150">
                    <td className="px-5 py-3 text-zinc-700 dark:text-zinc-300">{row.region}</td>
                    <td className="px-5 py-3 text-right text-zinc-600 dark:text-zinc-400">{row.latency}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`font-semibold ${row.up ? "text-emerald-600 dark:text-emerald-500" : "text-red-500"}`}>
                        {row.up ? "UP" : "DOWN"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}