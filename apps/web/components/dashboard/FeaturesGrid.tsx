export function FeaturesGrid() {
  return (
    <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Top Banner Feature */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#111] p-12 text-center shadow-lg md:p-24 mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none pointer-events-none">
           <svg preserveAspectRatio="none" viewBox="0 0 1200 400" className="absolute w-[200%] md:w-full h-full blur-[1px]">
             <path d="M0,200 C300,50 600,350 1200,200" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
             <path d="M0,220 C400,100 800,250 1200,220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
           </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Global Validation Network
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Your services are verified from independent nodes across 120+
            countries simultaneously.
          </p>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        
        {/* Decentralized Network Feature */}
        <div className="rounded-xl border border-zinc-800 bg-[#111] p-8 shadow-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/50 text-[#3b82f6]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-white">Decentralized Network</h3>
          <p className="text-sm leading-relaxed text-zinc-400 mb-8">
            Leverage 10,000+ globally distributed nodes to verify uptime, bypassing local DNS or regional routing issues.
          </p>
          <div className="mt-auto rounded-lg bg-[#0a0a0a] p-4 border border-zinc-800/50 font-mono text-xs text-zinc-400 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-300">99.999% Network Reliability</span>
            </div>
          </div>
        </div>

        {/* Instant Alerts Feature */}
        <div className="rounded-xl border border-zinc-800 bg-[#111] p-8 shadow-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/50 text-[#3b82f6]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              </div>
            </div>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-white">Instant Alerts</h3>
          <p className="text-sm leading-relaxed text-zinc-400 mb-8">
            Sub-second notification delivery via Slack, Telegram, Webhooks, or Email the moment consensus determines an outage.
          </p>
          <div className="mt-auto rounded-lg bg-[#0a0a0a] p-4 border border-zinc-800/50 font-mono text-xs text-zinc-400 shadow-inner leading-relaxed">
            <span className="text-zinc-500">&gt; </span>Outage detected: api.production.com<br/>
            <span className="text-zinc-500">&gt; </span>Consensus reached: 45/50 nodes reporting <span className="text-red-400">DOWN</span><br/>
            <span className="text-zinc-500">&gt; </span>Firing webhook to slack channel #ops-alerts...
          </div>
        </div>
      </div>

      {/* Detailed Analytics Feature */}
      <div className="rounded-xl border border-zinc-800 bg-[#111] p-8 shadow-lg transition-transform hover:-translate-y-1 duration-300 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/50 text-[#3b82f6]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-white">Detailed Analytics</h3>
          <p className="text-sm leading-relaxed text-zinc-400 mb-6">
            Granular performance data broken down by region, node provider, and connection phase.
          </p>
          <a href="#" className="font-semibold text-zinc-300 hover:text-white transition-colors text-sm">
            View Sample Dashboard &rarr;
          </a>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="rounded-lg border border-zinc-800/50 bg-[#0a0a0a] p-1 font-mono text-xs shadow-inner">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 uppercase">
                  <th className="px-4 py-3 font-semibold">Region</th>
                  <th className="px-4 py-3 font-semibold text-right">Latency</th>
                  <th className="px-4 py-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800/50">
                  <td className="px-4 py-3">us-east</td>
                  <td className="px-4 py-3 text-right">42ms</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-500">UP</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="px-4 py-3">eu-central</td>
                  <td className="px-4 py-3 text-right">118ms</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-500">UP</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">ap-south</td>
                  <td className="px-4 py-3 text-right">205ms</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-500">UP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}