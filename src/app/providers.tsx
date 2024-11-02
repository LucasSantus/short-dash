"use client";

import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import { getQueryClient, trpc } from "@/trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { unstable_httpBatchStreamLink } from "@trpc/client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { type PropsWithChildren, useState } from "react";
import SuperJSON from "superjson";
import { NoScript } from "./no-script";

export function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: env.NEXT_PUBLIC_BASE_URL.concat("/api/trpc"),
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <SessionProvider refetchOnWindowFocus>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster duration={4000} richColors closeButton visibleToasts={9} />

            <NoScript />

            <NextTopLoader
              color="hsl(var(--primary))"
              initialPosition={0.1}
              crawlSpeed={200}
              height={3}
              speed={200}
              zIndex={9999}
              showAtBottom={false}
              showSpinner={false}
              crawl
            />

            {process.env.NODE_ENV !== "production" && <ReactQueryDevtools initialIsOpen={false} />}

            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </trpc.Provider>
  );
}
