import { BaseRequest } from "@/type";
import { calculateTableIndex } from "@/utils";

// (value:ValueType, record:RecordType, index:number)
export const renderDataIndex = (index: number, params?: BaseRequest) => {
  return calculateTableIndex(index, params);
};
