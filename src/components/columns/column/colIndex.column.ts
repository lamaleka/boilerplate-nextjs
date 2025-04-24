import { COLUMN } from "@/constants";
import { BaseRequest, ColType } from "@/type";
import { renderDataIndex } from "../render/dataIndex.render";

export const ColIndex = <T>({ params }: { params?: BaseRequest }): ColType<T> => ({
  ...COLUMN.index,
  onHeaderCell: () => ({
    style: { width: 45 },
  }),
  onCell: () => ({
    style: { width: 45 },
  }),
  align: "center",
  render: (_: any, __: any, index: number) => renderDataIndex(index, params),
  editable: false,
  filteredValue: null,
});
