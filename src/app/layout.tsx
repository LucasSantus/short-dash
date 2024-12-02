import { publicMetadata } from "@/config/metadata";
import { env } from "@/env";
import { startCronJob } from "@/lib/cron";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "./providers";

import "../styles/globals.css";
import "../styles/reset.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

if (env.NODE_ENV !== "production") {
  startCronJob();
}

export const metadata: Metadata = publicMetadata;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={cn(inter.variable, mono.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
