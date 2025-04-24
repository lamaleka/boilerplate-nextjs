import { GetProp, TableProps } from "antd";
import { TableCurrentDataSource } from "antd/lib/table/interface";

type TablePaginationConfig = Exclude<GetProp<TableProps, "pagination">, boolean>;

export interface BaseTableParams<T = any> {
  pagination: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
  keyword?: string;
  extra?: TableCurrentDataSource<T>;
}
