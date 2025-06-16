"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { NotificationProvider } from "@/providers/notification-provider";
import { ChatProvider } from "@/providers/chat-provider";
import { LoadingProvider } from "@/providers/loading-provider";
import { ProfilePrivacyProvider } from "@/providers/profile-privacy-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { useState } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors
              if (
                error?.response?.status >= 400 &&
                error?.response?.status < 500
              ) {
                return false;
              }
              return failureCount < 3;
            },
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ProfilePrivacyProvider>
                <LoadingProvider>
                  <NotificationProvider>
                    <ChatProvider>{children}</ChatProvider>
                  </NotificationProvider>
                </LoadingProvider>
              </ProfilePrivacyProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        {/* {process.env.NODE_ENV === "development" && <ReactQueryDevtools />} */}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
