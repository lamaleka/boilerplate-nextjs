import { COLUMN } from "@/constants";
import { useFilterSearch } from "@/hooks";
import { ColType, ColTypeProps } from "@/type";

export const colNama = <T>(): ColType<T> => ({
  ...COLUMN.nama,
  onHeaderCell: () => ({
    style: { width: 96 },
  }),
  onCell: () => ({
    style: { minWidth: 96 },
  }),
});

export const ColNama = <T>({ handleSearch }: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.nama;
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
