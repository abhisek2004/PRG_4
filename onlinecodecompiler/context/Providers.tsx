"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  // defaultOptions: {queries: {staleTime: 1000 * 60 * 5}},
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilRoot>{children}</RecoilRoot>
          <Toaster position="top-center" />
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
