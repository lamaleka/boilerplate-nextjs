import { ColBadge, ColDeptTitle, ColIndex, ColNama, ColPosTitle } from "@/components";
import { ColsProps, ColsType, Employee } from "@/type";

export const colsEmployeeAll = ({ params, handleSearch }: ColsProps<Employee>): ColsType<Employee> => [
  ColIndex({ params }),
  ColNama({ handleSearch }),
  ColBadge({ handleSearch }),
  ColDeptTitle({ handleSearch }),
  ColPosTitle({ handleSearch }),
];
