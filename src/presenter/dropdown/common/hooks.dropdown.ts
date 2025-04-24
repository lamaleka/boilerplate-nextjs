"use client";

import { DropdownApi } from "@/data";
import { useMutation } from "@tanstack/react-query";

export const useDropdownAllEmployee = () =>
  useMutation({
    mutationKey: ["DropdownAllEmployee"],
    mutationFn: (keyword: string) => DropdownApi.allEmployee({ nama: keyword }),
  });

export const useDropdownAllRole = () =>
  useMutation({
    mutationKey: ["DropdownAllRole"],
    mutationFn: (keyword: string) => DropdownApi.allRole({ keyword }),
  });

export const useDropdownAllEmployeeUnregistered = () =>
  useMutation({
    mutationKey: ["DropdownAllEmployeeUnregistered"],
    mutationFn: (keyword: string) => DropdownApi.allEmployeeUnregistered({ nama: keyword }),
  });

export const useDropdownAllBuyerUnregistered = () =>
  useMutation({
    mutationKey: ["DropdownAllVendorUnregistered"],
    mutationFn: (keyword: string) => DropdownApi.allBuyerUnregistered({ keyword }),
  });
