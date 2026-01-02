"use client";

import Image from "next/image";
import LogoIcon from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  animate?: boolean;
}

const Logo = ({ className, animate = true }: LogoProps) => {
  return (
    <Image
      src={LogoIcon}
      alt="SpendBox Logo"
      className={cn(animate && "animate-spin [animation-duration:20s]", className)}
      width={32}
      height={32}
    />
  );
};

export default Logo;
