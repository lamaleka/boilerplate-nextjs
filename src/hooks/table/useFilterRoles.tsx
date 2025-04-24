import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ColumnFilterItem, FilterValue } from "antd/lib/table/interface";

interface UseFilterRolesProps {
  dataIndex: string;
  handleSearch?: (column: string, value: string) => void;
}
export function useFilterRoles({ dataIndex, handleSearch }: UseFilterRolesProps) {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get(dataIndex);
  const [value, setValue] = useState<FilterValue | null>(searchParam?.split(",") ?? null);
  useEffect(() => {
    if (!searchParam) {
      resetFilterRef.current();
    } else {
      setValue(searchParam.split(","));
    }
  }, [dataIndex, searchParam]);
  const resetFilterRef = useRef(() => {
    setValue(null);
    handleSearch?.(dataIndex, "");
  });
  const filters: ColumnFilterItem[] = [
    {
      text: "Admin",
      value: 1,
    },
    {
      text: "Staff Verifikasi",
      value: 2,
    },
    {
      text: "Vendor",
      value: 3,
    },
  ];
  return {
    filters,
    filtered: !!searchParam,
    filteredValue: value,
  };
}
