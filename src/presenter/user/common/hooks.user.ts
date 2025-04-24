"use client";

import { UserApi } from "@/data";
import { ENDPOINTS } from "@/constants";
import { BaseRequest, UserCreate, UserUpdate } from "@/type";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";

export function useUserAll(params: BaseRequest, queryKey: QueryKey) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => UserApi.all(params),
  });
}
export function useUserCreate() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.user.base, "UserCreate"],
    mutationFn: (payload: UserCreate) => UserApi.create(payload),
  });
}
export function useUserDetail(id: string) {
  return useQuery({
    queryKey: [ENDPOINTS.masters.user.byId(id), "UserDetail"],
    queryFn: () => UserApi.detail(id),
  });
}

export function useUserUpdate(id: string) {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.user.byId(id), "UserUpdate"],
    mutationFn: (payload: UserUpdate) => UserApi.update(id, payload),
  });
}
export function useUserResetPassword() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.user.resetPassword, "UserResetPassword"],
    mutationFn: (id: string) => UserApi.resetPassword(id),
  });
}
export function useUserDelete() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.user, "UserDelete"],
    mutationFn: (id: string) => UserApi.delete(id),
  });
}
