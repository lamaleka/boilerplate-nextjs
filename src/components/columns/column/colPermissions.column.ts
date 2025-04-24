import { COLUMN } from "@/constants";
import { ColType } from "@/type";

export const colPermissions = <T>(): ColType<T> => ({
  ...COLUMN.permissions,
});
