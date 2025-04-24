import { COLUMN } from "@/constants";

import { ColType } from "@/type";
import { useFilterIsActive } from "@/hooks";
import { renderIsActive } from "../render/isActive.render";

export const ColIsActive = <T>({ onClick }: { onClick: (record: T) => void }): ColType<T> => {
  const column = COLUMN.isActive;
  const { filters, filtered, filteredValue, filterMultiple } = useFilterIsActive({
    dataIndex: column.dataIndex,
  });
  const filterProps: Pick<ColType<T>, "filters" | "filtered" | "filteredValue" | "filterMultiple"> = {
    filters,
    filtered,
    filteredValue,
    filterMultiple,
  };
  return {
    ...column,
    onHeaderCell: () => ({ style: { width: column?.colWidth } }),
    onCell: () => ({ style: { minWidth: column?.colWidth } }),
    render: (value: boolean, record: T) => renderIsActive(value, record, onClick),
    sorter: true,
    filterResetToDefaultFilteredValue: true,
    ...filterProps,
  };
};
