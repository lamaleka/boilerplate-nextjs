import { COLUMN } from "@/constants";
import { ColType, ColTypeProps } from "@/type";
import { renderEmployee } from "../render/employee.render";

export const ColEmployee = <T>({}: ColTypeProps<T>): ColType<T> => {
  const column = COLUMN.employee;
  return {
    ...column,
    onHeaderCell: () => ({ style: { width: column?.colWidth } }),
    onCell: () => ({ style: { minWidth: column?.colWidth } }),
    render: renderEmployee,
  };
};
