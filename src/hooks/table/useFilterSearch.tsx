import { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useSearchParams } from "next/navigation";
interface UseFilterSearchProps {
  dataIndex: string;
  handleSearch?: (column: string, value: string) => void;
}
export function useFilterSearch({ dataIndex, handleSearch }: UseFilterSearchProps) {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get(dataIndex);
  const [value, setValue] = useState<string>(searchParam || "");
  const filtered = useRef<number>(0);

  useEffect(() => {
    if (!searchParam) {
      resetFilterRef.current();
    }
  }, [dataIndex, searchParam]);
  const resetFilterRef = useRef(() => {
    setValue("");
  });

  const onSearch = (param: string) => {
    handleSearch?.(dataIndex, param);
  };

  const filterDropdown = ({ confirm }: FilterDropdownProps) => {
    return (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input.Search
          value={value}
          placeholder="Ketik dan tekan enter"
          onChange={(e) => {
            const value = e.target.value;
            setValue(value);
            if (value === "") {
              filtered.current = 0;
              onSearch("");
              confirm({ closeDropdown: false });
            }
          }}
          onSearch={() => {
            onSearch(value);
            confirm();
          }}
          onPressEnter={() => {
            onSearch(value);
            confirm();
          }}
          allowClear
          onClear={() => {
            filtered.current = 1;
            onSearch("");
            confirm({ closeDropdown: false });
          }}
        />
      </div>
    );
  };
  return {
    filterDropdown,
    filtered: !!searchParam,
  };
}
