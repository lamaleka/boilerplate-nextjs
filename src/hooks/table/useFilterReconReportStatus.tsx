import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ColumnFilterItem, FilterValue } from "antd/lib/table/interface";

interface UseFilterReconReportStatus {
  dataIndex: string;
  handleSearch?: (column: string, value: string) => void;
}
export function useFilterReconReportStatus({ dataIndex, handleSearch }: UseFilterReconReportStatus) {
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
      text: "Belum",
      value: 1,
    },
    {
      text: "Generating",
      value: 2,
    },
    {
      text: "Menunggu Settlement",
      value: 3,
    },
  ];
  return {
    filters,
    filtered: !!searchParam,
    filteredValue: value,
  };
}
