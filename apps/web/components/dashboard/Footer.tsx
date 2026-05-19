export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-zinc-800 bg-[#050505] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row sm:px-6 lg:px-8">
        <p className="text-lg font-bold text-white">DPIN Uptime</p>

        {/* <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-zinc-500">
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Status</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
        </nav> */}

        <p className="text-xs text-zinc-500">
          &copy; {currentYear} DPIN Uptime. All rights reserved.
        </p>
      </div>
    </footer>
  );
}