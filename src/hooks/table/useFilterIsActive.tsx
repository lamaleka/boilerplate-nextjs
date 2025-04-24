import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ColumnFilterItem, FilterValue } from "antd/lib/table/interface";

interface UseFilterIsActiveProps {
  dataIndex: string;
  handleSearch?: (column: string, value: string) => void;
}
export function useFilterIsActive({ dataIndex, handleSearch }: UseFilterIsActiveProps) {
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
      text: "Aktif",
      value: 1,
    },
    {
      text: "Nonaktif",
      value: 0,
    },
  ];
  return {
    filters,
    filtered: !!searchParam,
    filteredValue: value,
    filterMultiple: false,
  };
}
