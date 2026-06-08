export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 mb-20 border-t border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#050505] py-12 transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300">Pingsy</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          &copy; {currentYear} Pingsy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}