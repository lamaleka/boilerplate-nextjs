import { COLUMN } from "@/constants";
import { ColType } from "@/type";

export const colLabel = <T>(): ColType<T> => ({
  ...COLUMN.label,
});
