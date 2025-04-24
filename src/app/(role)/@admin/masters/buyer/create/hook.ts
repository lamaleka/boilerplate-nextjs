"use client";
import { useMutationCallbacks } from "@/hooks";
import { BuyerRequest } from "@/type";
import { UseMutationResult } from "@tanstack/react-query";

export const useBuyerCreateHandlers = () => {
  const createCallback = useMutationCallbacks();
  const saveCreate = (mutation: UseMutationResult<any, any, BuyerRequest>) => (v: BuyerRequest) => {
    mutation.mutate(BuyerRequest.asPayload(v), createCallback);
  };
  return { saveCreate };
};
