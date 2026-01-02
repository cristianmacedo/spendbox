interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Hero = ({ title, subtitle, children }: HeroProps) => {
  return (
    <header className="w-full min-h-[280px] bg-primary-700 dark:bg-primary-900 px-4 sm:px-8 lg:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
          {title}
        </h1>
        <p className="font-semibold text-primary-100">{subtitle}</p>
      </div>
      {children}
    </header>
  );
};

export default Hero;
