import { useEffect, useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useSearchParams } from "next/navigation";
import { FilterConfirmProps } from "antd/lib/table/interface";
import { DatePicker, Flex } from "antd/lib";
import { PAYLOAD_DATE_TIME_FORMAT, RANGE_PICKER_PRESETS } from "@/constants";
import { Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { dayjs, Dayjs } from "@/lib";

const { RangePicker } = DatePicker;
interface UseFilterSearchProps {
  dataIndex: string;
  handleSearch?: (column: string, value: string) => void;
}
export function useFilterDate({ dataIndex, handleSearch }: UseFilterSearchProps) {
  const searchParams = useSearchParams();
  const searchParamStart = searchParams.get(`${dataIndex}_start`);
  const searchParamEnd = searchParams.get(`${dataIndex}_end`);
  const [value, setValue] = useState<[start: Dayjs | null | undefined, end: Dayjs | null | undefined]>(
    searchParamStart && searchParamEnd ? [dayjs(searchParamStart), dayjs(searchParamEnd)] : [null, null],
  );
  const filtered = useRef<number>(0);

  useEffect(() => {
    if (!searchParamStart && !searchParamEnd && filtered.current > 0) {
      resetFilterRef.current();
    }
  }, [dataIndex, searchParamEnd, searchParamStart]);
  const resetFilterRef = useRef(() => {
    setValue([null, null]);
  });

  const onSearch = (confirm: (param?: FilterConfirmProps) => void) => {
    if (!isDisabled) {
      const startDate = value[0]?.startOf("day").format(PAYLOAD_DATE_TIME_FORMAT);
      const endDate = value[1]?.endOf("day").format(PAYLOAD_DATE_TIME_FORMAT);
      const searchValue = startDate + "to" + endDate;
      handleSearch?.(dataIndex, searchValue);
      confirm();
    }
  };

  const isDisabled = !value || value.length !== 2 || !value[0] || !value[1];

  const filterDropdown = ({ confirm }: FilterDropdownProps) => {
    return (
      <Flex style={{ padding: 8 }} gap={8} vertical>
        <RangePicker
          value={value}
          presets={RANGE_PICKER_PRESETS}
          onChange={(dates: null | (Dayjs | null)[]) => {
            setValue([dates?.[0], dates?.[1]]);
            filtered.current = 1;
            if (!dates) {
              filtered.current = 0;
              onSearch(confirm);
            }
          }}
        />
        <Space align="end">
          <Button disabled={isDisabled} type="primary" icon={<SearchOutlined />} size="small" style={{ width: 90 }} onClick={() => onSearch(confirm)}>
            Search
          </Button>
          <Button
            disabled={isDisabled}
            size="small"
            style={{ width: 90 }}
            onClick={() => {
              resetFilterRef.current();
              handleSearch?.(dataIndex, "");
              confirm();
            }}
          >
            Reset
          </Button>
        </Space>
      </Flex>
    );
  };
  return {
    filterDropdown,
    filtered: !!searchParamStart && !!searchParamEnd,
  };
}
