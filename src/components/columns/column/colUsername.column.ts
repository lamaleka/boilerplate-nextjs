import { COLUMN } from "@/constants";
import { useFilterSearch } from "@/hooks";
import { ColType, ColTypeProps } from "@/type";

export const colUsername = <T>(): ColType<T> => ({
  ...COLUMN.userName,
});

export const ColUsername = <T>({ handleSearch }: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.userName;
  const { filterDropdown, filtered } = useFilterSearch({
    dataIndex: column.dataIndex,
    handleSearch: handleSearch,
  });
  const filterProps: Pick<ColType<T>, "filtered" | "filterDropdown" | "filteredValue"> = {
    filtered,
    filterDropdown,
    filteredValue: null,
  };
  return {
    ...column,
    onHeaderCell: () => ({ style: { width: column?.colWidth } }),
    onCell: () => ({ style: { minWidth: column?.colWidth } }),
    ...filterProps,
  };
};
