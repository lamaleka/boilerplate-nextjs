"use client";
import { ROUTES } from "@/constants";
import { Failure } from "@/type";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const { message } = App.useApp();
  const router = useRouter();
  const retryCount = useRef(0);
  const handleQueryError = (error: Error, retry: number) => {
    retryCount.current++;
    if (retryCount.current == retry) {
      retryCount.current = 0;
      setTimeout(() => {
        const failure = error as Failure;
        message.error(failure.message);
        retryCount.current = 0;
        if (failure?.code === 401) {
          const redirectTo = btoa(`${window.location.pathname}${window.location.search}`);
          router.push(`${ROUTES.auth.logout}?redirect=${redirectTo}`);
        }
      }, 0);
    }
  };
  const handleQueryErrorRef = useRef(handleQueryError);

  const handleMutationError = (error: Error) => {
    setTimeout(() => {
      const failure = error as Failure;
      message.error(failure.message);
      if (failure?.code === 401) {
        const redirectTo = btoa(`${window.location.pathname}${window.location.search}`);
        router.push(`${ROUTES.auth.logout}?redirect=${redirectTo}`);
      }
    }, 0);
  };
  const handleMutationErrorRef = useRef(handleMutationError);

  const client = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => handleMutationErrorRef.current(error),
      },
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        retry: 2,
        throwOnError: (error) => {
          handleQueryErrorRef.current(error, 2);
          return false;
        },
      },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
