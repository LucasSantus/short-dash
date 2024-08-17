"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren, Suspense, useState } from "react";
import { Navigation } from "./navigation";
import { NoScript } from "./no-script";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => {
    return new QueryClient();
  });

  return (
    <SessionProvider refetchOnWindowFocus>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster duration={4000} richColors closeButton visibleToasts={9} />

          <NoScript />

          <NextTopLoader
            color="#2299DD"
            initialPosition={0.1}
            crawlSpeed={200}
            height={3}
            speed={200}
            zIndex={9999}
            showAtBottom={false}
            showSpinner={false}
            crawl
          />

          <Suspense fallback={null}>
            <Navigation />
          </Suspense>

          {process.env.NODE_ENV !== "production" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}

          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
