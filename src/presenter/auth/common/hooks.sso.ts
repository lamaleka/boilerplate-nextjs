"use client";
import { AuthApi } from "@/data";
import { ENDPOINTS } from "@/constants";
import { LoginRequest } from "@/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useVerifySSO() {
  return useQuery({
    queryKey: [ENDPOINTS.auth.verifySSO, "VerifySSO"],
    queryFn: () => AuthApi.verifySSO(),
  });
}
export function useVerifySSOMutation() {
  return useMutation({
    mutationKey: [ENDPOINTS.auth.verifySSO, "VerifySSOMutation"],
    mutationFn: () => AuthApi.verifySSO(),
  });
}
export function useLogin() {
  return useMutation({
    mutationKey: [ENDPOINTS.auth.login, "Login"],
    mutationFn: (payload: LoginRequest) => AuthApi.login(payload),
  });
}
