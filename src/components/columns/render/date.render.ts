import { dayjs } from "@/lib";

export const renderDate = (date: string) => {
  return dayjs.utc(date).format("DD MMMM YYYY");
};
