import { COLUMN } from "@/constants";
import { useFilterSearch } from "@/hooks";
import { ColType, ColTypeProps } from "@/type";

export const colBadge = <T>(): ColType<T> => ({
  ...COLUMN.badge,
});
export const ColBadge = <T>({ handleSearch }: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.badge;
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
