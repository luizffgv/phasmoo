import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import ThemeSwitcher from "./_components/theme-switcher";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spirit Box Web",
  description: "A Phasmophobia ghost identification helper.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning /* For instant theme application */
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/initial-theme-applier.js"></script>
      </head>
      <body
        className={`${quicksand.className} h-dvh sm:h-auto flex flex-col items-center transition-colors bg-slate-200 dark:bg-slate-900 dark:text-white p-4 gap-8`}
      >
        <ThemeSwitcher></ThemeSwitcher>
        {children}
      </body>
    </html>
  );
}
