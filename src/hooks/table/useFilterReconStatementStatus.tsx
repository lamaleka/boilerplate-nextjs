import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ColumnFilterItem, FilterValue } from "antd/lib/table/interface";

interface UseFilterReconStatementStatus {
  dataIndex: string;
  handleSearch?: (column: string, value: string) => void;
}
export function useFilterReconStatementStatus({ dataIndex, handleSearch }: UseFilterReconStatementStatus) {
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
      text: "Menunggu Approval",
      value: 4,
    },
    {
      text: "Selesai",
      value: 5,
    },
    {
      text: "Ditutup",
      value: 6,
    },
  ];
  return {
    filters,
    filtered: !!searchParam,
    filteredValue: value,
  };
}
