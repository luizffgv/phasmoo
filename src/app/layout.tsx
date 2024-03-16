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
        className={`${quicksand.className} flex h-dvh flex-col items-center gap-8 bg-stone-200 p-4 text-stone-700 transition-colors sm:h-auto dark:bg-stone-900 dark:text-stone-100`}
      >
        <ThemeSwitcher></ThemeSwitcher>
        {children}
      </body>
    </html>
  );
}
