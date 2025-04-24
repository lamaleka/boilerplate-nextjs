"use client";
import { Failure } from "@/type";
import { AxiosError } from "axios";

export function HandleAxiosError(error: string | unknown | null): Failure {
  let failure: Failure;
  if (error instanceof AxiosError) {
    failure = {
      code: error.status,
      cause: error.code,
      message: error.response?.data["message"] ?? error.message,
    };
  } else {
    failure = {
      code: 521,
      cause: `${error}`,
      message: `${error}`,
    };
  }
  return failure;
}
