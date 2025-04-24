import { COLUMN } from "@/constants";
import { useFilterSearch } from "@/hooks";
import { ColType, ColTypeProps } from "@/type";

export const colTitle = <T>(): ColType<T> => ({
  ...COLUMN.title,
});
export const ColTitle = <T>({ handleSearch, sortInfo }: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.title;
  const isSorted = sortInfo?.columnKey === column.key;
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
    sortOrder: isSorted ? sortInfo?.order : null,
    sorter: true,
  };
};
