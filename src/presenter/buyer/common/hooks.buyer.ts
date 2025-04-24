"use client";

import { ENDPOINTS } from "@/constants";
import { BuyerApi } from "@/data";
import { BaseRequest, BuyerRequest } from "@/type";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";

export function useBuyerAll(params: BaseRequest, queryKey: QueryKey) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => BuyerApi.all(params),
  });
}
export function useBuyerCreate() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.buyer.base, "BuyerCreate"],
    mutationFn: (payload: BuyerRequest) => BuyerApi.create(payload),
  });
}
export function useBuyerDetail(id: string) {
  return useQuery({
    queryKey: [ENDPOINTS.masters.buyer.byId(id), "BuyerDetail"],
    queryFn: () => BuyerApi.detail(id),
  });
}

export function useBuyerUpdate(id: string) {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.buyer.byId(id), "BuyerUpdate"],
    mutationFn: (payload: BuyerRequest) => BuyerApi.update(id, payload),
  });
}
export function useBuyerDelete() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.buyer, "BuyerDelete"],
    mutationFn: (id: string) => BuyerApi.delete(id),
  });
}
