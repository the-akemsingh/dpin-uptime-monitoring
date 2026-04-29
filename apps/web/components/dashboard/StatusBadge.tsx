export function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-[#121212]/80 px-4 py-1.5 text-xs font-bold tracking-widest text-zinc-300 uppercase shadow-inner backdrop-blur-xs">
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>
      NETWORK STATUS: 10,432 NODES ACTIVE
    </div>
  );
}
