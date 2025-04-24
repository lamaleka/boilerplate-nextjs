"use client";
import { useMutationCallbacks } from "@/hooks";
import { EmployeeRequest } from "@/type";
import { UseMutationResult } from "@tanstack/react-query";

export const useEmployeeUpdateHandlers = () => {
  const updateCallback = useMutationCallbacks();
  const saveUpdate = (mutation: UseMutationResult<any, any, EmployeeRequest>) => (v: EmployeeRequest) => {
    mutation.mutate(EmployeeRequest.asPayload(v), updateCallback);
  };
  return { saveUpdate };
};
