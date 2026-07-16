export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white shadow-sm">
              <svg className="h-4 w-4 text-white dark:text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">
              Pingsy
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-zinc-400 dark:text-zinc-500">
            <a href="#how-it-works" className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">Docs</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">GitHub</a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {currentYear} Pingsy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}