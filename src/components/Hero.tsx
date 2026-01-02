"use client";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Hero = ({ title, subtitle, children }: HeroProps) => {
  return (
    <header className="w-full min-h-[280px] bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 dark:from-primary-950 dark:via-primary-900 dark:to-primary-800 px-4 sm:px-8 lg:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative overflow-hidden">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-accent-400/5 rounded-full blur-2xl" />

      {/* Radial glow behind content */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl" />

      {/* Content */}
      <div className="max-w-md w-full relative z-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-white drop-shadow-sm">
          {title}
        </h1>
        <p className="font-semibold text-primary-100">{subtitle}</p>
      </div>
      <div className="relative z-10 max-w-md w-full">{children}</div>
    </header>
  );
};

export default Hero;
