export interface ResponseMessage {
  code?: number;
  message?: string;
}
export interface ResponseOne<T> {
  code?: number;
  message?: string;
  data: T;
}
export interface ResponseList<T> {
  code?: number;
  message?: string;
  pagination?: Pagination;
  data: T[];
}
export interface Pagination {
  page_number: number;
  page_size: number;
  total_data?: number;
}
