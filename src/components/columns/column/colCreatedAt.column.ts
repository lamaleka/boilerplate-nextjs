import { COLUMN } from "@/constants";
import { ColType, ColTypeProps } from "@/type";
import { renderDate } from "../index.component";
import { useFilterDate } from "@/hooks";

export const ColCreatedAt = <T>({ handleSearch, sortInfo }: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.createdAt;
  const isSorted = sortInfo?.columnKey === column.key;
  const { filterDropdown, filtered } = useFilterDate({
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
    fixed: isSorted ? "left" : false,
    render: renderDate,
  };
};
export const colCreatedAt = <T>(): ColType<T> => ({
  ...COLUMN.createdAt,
  width: "130px",
  render: renderDate,
});
