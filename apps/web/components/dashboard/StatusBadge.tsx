export function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#111]/80 px-5 py-2 text-[11px] font-bold tracking-[0.15em] text-zinc-500 dark:text-zinc-400 uppercase shadow-sm backdrop-blur-sm transition-colors duration-300">
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Decentralized · Live Monitoring
    </div>
  );
}
