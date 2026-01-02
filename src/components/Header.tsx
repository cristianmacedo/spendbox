"use client";

import { Github, Wallet } from "lucide-react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const APP_NAME = "SpendBox";

const Header = () => {
  return (
    <nav className="w-full h-14 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 flex items-center justify-between px-4 sm:px-8 lg:px-16 border-b border-accent-500/30 shadow-[0_2px_20px_-5px] shadow-accent-500/20 relative overflow-hidden">
      {/* Subtle animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_8s_ease-in-out_infinite]" />
      
      {/* Logo */}
      <Link 
        href="/"
        className="flex items-center gap-2 text-accent-300 hover:text-accent-200 transition-colors group relative z-10"
      >
        <div className="p-1.5 rounded-lg bg-accent-500/20 group-hover:bg-accent-500/30 transition-colors">
          <Wallet className="w-5 h-5 text-accent-400 group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4 relative z-10">
        <ThemeSwitcher />
        <Link
          href="https://github.com/cristianmacedo/spendbox"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-accent-300 hover:text-accent-100 hover:bg-accent-500/20 transition-all font-bold"
        >
          <span className="hidden sm:inline">Contribute</span>
          <Github className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
