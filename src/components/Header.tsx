"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const APP_NAME = "SpendBox";

const Header = () => {
  return (
    <nav className="w-full h-14 bg-primary-800 dark:bg-primary-950 flex items-center justify-between px-4 sm:px-8 lg:px-16">
      <span className="text-lg text-accent-300 font-bold">{APP_NAME}</span>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Link
          href="https://github.com/cristianmacedo/spendbox"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-accent-300 hover:text-accent-200 transition-colors font-bold"
        >
          <span className="hidden sm:inline">Contribute</span>
          <Github className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
