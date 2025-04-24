import { COLUMN } from "@/constants";
import { useFilterSearch } from "@/hooks";
import { ColType, ColTypeProps } from "@/type";

export const colName = <T>(): ColType<T> => ({
  ...COLUMN.name,
  onHeaderCell: () => ({
    style: { width: 96 },
  }),
  onCell: () => ({
    style: { minWidth: 96 },
  }),
});

export const ColName = <T>({ handleSearch }: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.name;
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
