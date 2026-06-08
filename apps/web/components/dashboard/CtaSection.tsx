export function CtaSection() {
  return (
    <div className="my-16 flex justify-center">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-12 text-center md:pb-20 md:pt-16 md:px-24 mx-auto w-full max-w-4xl shadow-xl transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl transition-colors duration-300">
            Ready to secure your uptime?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-zinc-500 dark:text-zinc-400">
            Join thousands of developers relying on decentralized
            infrastructure for absolute certainty.
          </p>
          <div className="mt-10 flex justify-center">
             <button
              onClick={() => window.dispatchEvent(new Event("trigger-login-modal"))}
              className="rounded-lg bg-[#3b82f6] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-blue-600 focus:outline-hidden shadow-[0_0_40px_rgba(59,130,246,0.3)] cursor-pointer"
            >
              Add your first website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}