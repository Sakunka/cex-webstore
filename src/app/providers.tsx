"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/lib/store";
import React from "react";
import AuthChecker from "@/components/Auth/AuthChecker";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthChecker>{children}</AuthChecker>
      </Provider>
    </QueryClientProvider>
  );
}
