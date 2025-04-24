"use client";
import { useMutationCallbacks } from "@/hooks";
import { BuyerRequest } from "@/type";
import { UseMutationResult } from "@tanstack/react-query";

export const useBuyerUpdateHandlers = () => {
  const createCallback = useMutationCallbacks();
  const saveUpdate = (mutation: UseMutationResult<any, any, BuyerRequest>) => (v: BuyerRequest) => {
    mutation.mutate(BuyerRequest.asPayload(v), createCallback);
  };
  return { saveUpdate };
};
