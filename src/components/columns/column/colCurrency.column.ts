import { COLUMN } from "@/constants";
import { ColType, ColTypeProps } from "@/type";

export const ColLocalCurrency = <T>({}: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.currency;
  return {
    ...column,
    onHeaderCell: () => ({ style: { width: column?.colWidth } }),
    onCell: () => ({ style: { minWidth: column?.colWidth } }),
  };
};
