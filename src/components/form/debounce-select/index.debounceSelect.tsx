import React, { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd";
import debounce from "debounce";
import { DefaultOptionType } from "antd/lib/select";
import { UseMutationResult } from "@tanstack/react-query";

export interface DebounceSelectProps<ValueType> extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchFn: () => UseMutationResult<ValueType[], Error, string, unknown>;
  optionsItem: (option: ValueType[]) => DefaultOptionType[];
  debounceTimeout?: number;
}

export function DebounceSelect<ValueType extends DefaultOptionType>({ fetchFn, optionsItem, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);
  const { isPending, variables, mutate: fetchOptions } = fetchFn();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      if (fetchId !== fetchRef.current && fetchRef.current != 1) {
        return;
      }
      fetchOptions(value, {
        onSuccess: async (data: ValueType[]) => {
          setOptions(data);
        },
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const handleClick = () => {
    if (fetchRef.current == 0) {
      setOptions([]);
      fetchOptions("", {
        onSuccess: async (data: ValueType[]) => {
          setOptions(data);
          fetchRef.current += 1;
        },
      });
    }
  };

  return (
    <Select
      labelInValue
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      onClick={handleClick}
      defaultValue={[]}
      notFoundContent={isPending ? <Spin size="small" /> : variables ? `${variables} tidak ditemukan` : "Tidak ada data"}
      options={optionsItem(options)}
      {...props}
    />
  );
}
