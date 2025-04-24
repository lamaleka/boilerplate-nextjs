import { COLUMN } from "@/constants";
import { useFilterSearch } from "@/hooks";
import { ColType, ColTypeProps } from "@/type";

export const colDeptTitle = <T>(): ColType<T> => ({
  ...COLUMN.deptTitle,
});
export const ColDeptTitle = <T>({ handleSearch }: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.deptTitle;
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
