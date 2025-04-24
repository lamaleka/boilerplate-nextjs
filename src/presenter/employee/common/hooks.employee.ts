"use client";
import { EmployeeApi } from "@/data";
import { ENDPOINTS } from "@/constants";
import { BaseRequest, EmployeeRequest } from "@/type";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";

export function useEmployeeAll(params: BaseRequest, queryKey: QueryKey) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => EmployeeApi.all(params),
  });
}
export function useEmployeeCreate() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.employee.base, "EmployeeCreate"],
    mutationFn: (payload: EmployeeRequest) => EmployeeApi.create(payload),
  });
}
export function useEmployeeDetail(id: string) {
  return useQuery({
    queryKey: [ENDPOINTS.masters.employee.byId(id), "EmployeeDetail"],
    queryFn: () => EmployeeApi.detail(id),
  });
}

export function useEmployeeUpdate(id: string) {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.employee.byId(id), "EmployeeUpdate"],
    mutationFn: (payload: EmployeeRequest) => EmployeeApi.update(id, payload),
  });
}
export function useEmployeeUpdateStatus() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.employee, "EmployeeUpdateStatus"],
    mutationFn: (id: string) => EmployeeApi.updateStatus(id),
  });
}

export function useEmployeeDelete() {
  return useMutation({
    mutationKey: [ENDPOINTS.masters.employee, "EmployeeDelete"],
    mutationFn: (id: string) => EmployeeApi.delete(id),
  });
}
