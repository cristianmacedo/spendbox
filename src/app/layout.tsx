import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SpendBox",
  description:
    "Spend billionaires' money and visualize wealth with everyday products",
  openGraph: {
    title: "SpendBox",
    description: "Spend billionaires' money and visualize wealth",
    type: "website",
  },
};

function ThemeScript() {
  const script = `
    (function() {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-surface-100 dark:bg-primary-975 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
