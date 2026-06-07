import { StatusBadge } from "./StatusBadge";

export function HeroSection() {
  return (
    <div className="relative pt-24 pb-16 text-center lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 flex justify-center">
          <StatusBadge />
        </div>
        <h1 className="text-[3.5rem] leading-[1.1] font-extrabold tracking-tight text-zinc-900 dark:text-white lg:text-[4.5rem] transition-colors duration-300">
          Decentralized Uptime Monitoring for{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 dark:from-blue-400 to-blue-700 dark:to-[#3b82f6]">
            Modern Infrastructure
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
          Ensure 100% reliability. Our global network of decentralized validators
          monitors your endpoints from every corner of the internet, eliminating false
          positives and single points of failure.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ">
          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: "smooth" })}
            className="flex items-center gap-2 rounded-lg bg-[#3b82f6] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-blue-600 focus:outline-hidden shadow-[0_0_80px_rgba(59,630,546,0.35)] cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Add your first website
          </button>
        </div>
      </div>
    </div>
  );
}
