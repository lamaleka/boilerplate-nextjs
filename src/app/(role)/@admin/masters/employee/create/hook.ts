"use client";
import { EmployeeType } from "@/constants";
import { useMutationCallbacks } from "@/hooks";
import { EmployeeRequest } from "@/type";
import { UseMutationResult } from "@tanstack/react-query";
import { RadioChangeEvent } from "antd";
import { useState } from "react";

export const useEmployeeCreateHandlers = () => {
  const createCallback = useMutationCallbacks();
  const [employeeType, setEmployeeType] = useState<EmployeeType>(EmployeeType.TKO);
  const onEmployeeTypeChange = (e: RadioChangeEvent) => {
    setEmployeeType(e.target.value);
  };
  const saveCreate = (mutation: UseMutationResult<any, any, EmployeeRequest>) => (v: EmployeeRequest) => {
    mutation.mutate(EmployeeRequest.asPayload(v), createCallback);
  };
  return { saveCreate, employeeType, onEmployeeTypeChange };
};
