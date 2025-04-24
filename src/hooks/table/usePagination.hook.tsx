import { useRouter, useSearchParams } from "next/navigation";
import { QueryKey, type UseQueryResult } from "@tanstack/react-query";
import { BaseRequest, OnTableChange, ResponseList, Sorts } from "@/type";
import debounce from "debounce";
import { useMemo, useRef, useState } from "react";
import { TablePaginationConfig } from "antd";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/constants";
import { formatNumber } from "@/utils";

interface PaginationProps<T> {
  queryKeyParams: QueryKey;
  fetcher: (params: BaseRequest, queryKey: QueryKey) => UseQueryResult<ResponseList<T>, Error>;
}

export function usePagination<T>({ fetcher, queryKeyParams }: PaginationProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routerRef = useRef(router);
  const currentPage = Number(searchParams.get("page") || DEFAULT_PAGE_NUMBER);
  const currentPageSize = Math.min(Number(searchParams.get("pageSize")) || DEFAULT_PAGE_SIZE, 100);
  const [sortInfo, setSortInfo] = useState<Sorts<T>>({});

  const columnFilters = useMemo(() => {
    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "pageSize" && key !== "tab") {
        filters[key] = value;
      }
    });
    return filters;
  }, [searchParams]);

  const params = useMemo(
    () => ({
      page_size: currentPageSize,
      page_number: currentPage,
      ...columnFilters,
    }),
    [currentPageSize, currentPage, columnFilters],
  );

  const queryKey: QueryKey = useMemo(() => [queryKeyParams, currentPage, currentPageSize, JSON.stringify(columnFilters)], [queryKeyParams, currentPage, currentPageSize, columnFilters]);

  const { isLoading, data, refetch } = fetcher(params, queryKey);
  const pagination: TablePaginationConfig = useMemo(
    () => ({
      position: ["bottomRight"],
      total: data?.pagination?.total_data || 0,
      pageSize: params?.page_size,
      current: params?.page_number,
      pageSizeOptions: ["10", "25", "50"],
      showTotal: (total: number) => `Total : ${formatNumber(total)}`,
    }),
    [data?.pagination?.total_data, params?.page_size, params?.page_number],
  );

  // queryClient.setQueryData<GoodsPurchaseAll>(queryKey, (old) => {
  //   const data: GoodsPurchaseAll = {
  //       pagination: old?.pagination,
  //       data: []
  //   };
  //   if (old && old.data) {
  //     data.data.push(...old.data.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  //   }
  //   return data;
  // });
  const rawSearch = (column: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("page", "1");
      params.set("pageSize", currentPageSize.toString());
      if (column.includes("_date") || column.includes("_at")) {
        const newValue = value.split("to");
        if (newValue.length == 2) {
          params.set(`${column}_start`, newValue[0]);
          params.set(`${column}_end`, newValue[1]);
        }
        if (newValue.length == 1) {
          params.set(column, newValue[0]);
        }
      } else {
        params.set(column, value);
      }
    } else {
      if (column.includes("_date") || column.includes("_at")) {
        params.delete(`${column}_start`);
        params.delete(`${column}_end`);
      } else {
        params.delete(column);
      }
    }
    routerRef.current.replace(`?${params.toString()}`);
  };

  const handleSearch = useMemo(() => {
    const search = (column: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("page", "1");
        params.set("pageSize", currentPageSize.toString());
        if (column.includes("_date") || column.includes("_at")) {
          const newValue = value.split("to");
          if (newValue.length == 2) {
            params.set(`${column}_start`, newValue[0]);
            params.set(`${column}_end`, newValue[1]);
          }
        } else {
          params.set(column, value);
        }
      } else {
        if (column.includes("_date") || column.includes("_at")) {
          params.delete(`${column}_start`);
          params.delete(`${column}_end`);
        } else {
          params.delete(column);
        }
      }
      routerRef.current.replace(`?${params.toString()}`);
    };
    return debounce(search, 500);
  }, [currentPageSize, searchParams]);

  const resetPagination = () => {
    setSortInfo({});
    const params = new URLSearchParams();
    const tab = searchParams.get("tab");
    if (tab) {
      params.set("tab", tab);
    }
    params.set("page", "1");
    params.set("pageSize", currentPageSize.toString());
    routerRef.current.replace(`?${params.toString()}`);
  };

  const onTableChange: OnTableChange<T> = (pagination, filters, sorter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (pagination.current && pagination.pageSize) {
      params.set("page", pagination?.current?.toString());
      params.set("pageSize", pagination?.pageSize?.toString());
    }
    const sortInfo = sorter as Sorts<T>;
    setSortInfo(sortInfo);
    if (sortInfo.columnKey !== undefined) {
      params.set("order_by", sortInfo.columnKey as string);
      params.set("order", (sortInfo?.order?.endsWith("end") ? sortInfo?.order?.slice(0, -3) : sortInfo?.order) as string);
    } else {
      params.delete("order_by");
      params.delete("order");
    }
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    }

    routerRef.current.replace(`?${params.toString()}`);
  };
  return {
    params,
    isLoading,
    data,
    refetch,
    onTableChange,
    rawSearch,
    handleSearch,
    resetPagination,
    sortInfo,
    pagination,
    queryKey,
  };
}
