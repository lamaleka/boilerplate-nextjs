import { ResponseList } from "../base/baseResponse.type";
import { KeyValue } from "../common/keyValue.type";

export type KeyValueAll<T> = ResponseList<KeyValue<T>>;
