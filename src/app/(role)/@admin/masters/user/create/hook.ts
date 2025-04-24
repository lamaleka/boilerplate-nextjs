"use client";
import { useMutationCallbacks } from "@/hooks";
import { UserCreate } from "@/type";
import { UseMutationResult } from "@tanstack/react-query";
import { Form, FormInstance } from "antd";

export const usePlantCreateHandlers = (form: FormInstance<UserCreate>) => {
  const createCallback = useMutationCallbacks();
  const saveCreate = (mutation: UseMutationResult<any, any, UserCreate>) => (v: UserCreate) => {
    mutation.mutate(UserCreate.asPayload(v), createCallback);
  };
  const roleId = Form.useWatch<number>("role_type", form) ?? 0;
  const isEmployee = roleId !== 3;
  return { saveCreate, isEmployee };
};
