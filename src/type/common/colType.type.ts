import { AnyObject } from "antd/lib/_util/type";
import { ColumnGroupType, ColumnType, TableProps } from "antd/lib/table";
import { Key } from "react";

export interface ColCellCore {
  title: string;
  dataIndex: string;
  key: Key;
  editable?: boolean;
  colWidth?: number | string;
}

export type ColsType<RecordType = AnyObject> = ColType<RecordType>[];
export type ColType<T> = (ColumnGroupType<T> | ColumnType<T>) & ColCellCore;

export interface ColTypeProps<T> {
  handleSearch?: (column: string, value: string) => void;
  sortInfo?: Sorts<T>;
}

export type OnTableChange<T> = NonNullable<TableProps<T>["onChange"]>;
export type Filters<T> = Parameters<OnTableChange<T>>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
export type Sorts<T> = GetSingle<Parameters<OnTableChange<T>>[2]>;
