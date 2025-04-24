import { BaseRequest } from "../base/baseRequest.type";
import { Filters, Sorts } from "./colType.type";

export interface ColsProps<T> {
  params?: BaseRequest;
  handleSearch?: (column: string, value: string) => void;
  sortInfo?: Sorts<T>;
  filterInfo?: Filters<T>;
}

export interface ColActionReconStatementProps<T> {
  onEdit: (record: T) => void;
  onApprove: (record: T) => void;
  onDownload: (record: T) => void;
  onDelete: (record: T) => void;
}
export interface RenderActionReconStatement<T> extends ColActionReconStatementProps<T> {
  record: T;
}
