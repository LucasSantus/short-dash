"use client";

import { Toaster } from "@/components/ui/sonner";
import { getQueryClient, trpc } from "@/trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { PropsWithChildren, Suspense, useState } from "react";
import SuperJSON from "superjson";
import { Navigation } from "./navigation";
import { NoScript } from "./no-script";

export function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: "http://localhost:3000/api/trpc",
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  // const [queryClient] = useState(() => new QueryClient());

  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         transformer: SuperJSON,
  //         url: "http://localhost:3000/api/trpc",
  //       }),
  //     ],
  //   }),
  // );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
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
    </trpc.Provider>
  );
}
