import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import ModalProvider from "./_components/providers/modal-provider";
import Header from "./_components/header";
import StatusProvider from "./_components/providers/status-provider";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://phasmoo.luizf.dev"),
  title: "Phasmoo",
  description: "Identify Phasmophobia ghosts here.",
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
        <script
          src={`/service-worker-register.js`}
          data-build-id={process.env.buildID}
        ></script>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/initial-theme-applier.js"></script>
      </head>
      <body
        className={`${quicksand.className} flex h-dvh flex-col bg-stone-200 text-stone-700 transition-colors sm:h-auto dark:bg-stone-900 dark:text-stone-100`}
      >
        <ModalProvider>
          <StatusProvider>
            <div className="sticky top-0 z-[1]">
              <Header></Header>
            </div>
            <div className="grow overflow-y-auto">{children}</div>
          </StatusProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
