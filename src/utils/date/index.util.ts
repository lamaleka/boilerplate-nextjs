import { DEFAULT_DATE_FORMAT, PAYLOAD_DATE_TIME_FORMAT } from "@/constants";
import { dayjs } from "@/lib";
import { Dayjs } from "dayjs";

export function formatAsPayloadtDate(value: Dayjs | string | null | undefined): string {
  return dayjs(value).format(PAYLOAD_DATE_TIME_FORMAT);
}
export function formatAsDefaultDate(value: Dayjs | string | null | undefined): string {
  return dayjs(value).format(DEFAULT_DATE_FORMAT);
}
