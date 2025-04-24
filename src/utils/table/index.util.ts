import { BaseRequest } from "@/type/base/baseRequest.type";
import { BaseTableParams } from "@/type/base/baseTableParam.type";

export function mapTableParamToBaseRequest(params: BaseTableParams): BaseRequest {
  return {
    page_number: params.pagination?.current,
    page_size: params.pagination?.pageSize,
    keyword: params.keyword,
  };
}

export function calculateTableIndex(index: number, params?: BaseRequest) {
  {
    const currentPage = params?.page_number ?? 1;
    const pageSize = params?.page_size ?? 10;
    return (currentPage - 1) * pageSize + index + 1;
  }
}
