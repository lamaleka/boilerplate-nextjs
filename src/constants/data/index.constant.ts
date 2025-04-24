import { dayjs } from "@/lib";
import { TimeRangePickerProps } from "antd";

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";
export const PAYLOAD_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const SESSION_OPTIONS = {
  password: `${process.env.SESSION_SECRET}`,
  cookieName: "who-am-i",
  cookieOptions: {
    httpOnly: true,
    secure: true,
  },
};

export const RANGE_PICKER_PRESETS: TimeRangePickerProps["presets"] = [
  { label: "Hari Ini", value: [dayjs().startOf("day"), dayjs().startOf("day")] },
  { label: "Kemarin", value: [dayjs().startOf("day").add(-1, "d"), dayjs().startOf("day").add(-1, "d")] },
  { label: "Minggu Ini", value: [dayjs().startOf("week").add(1, "d"), dayjs().startOf("day")] },
  { label: "Minggu Lalu", value: [dayjs().startOf("week").add(-6, "d"), dayjs().startOf("week")] },
  { label: "Bulan Ini", value: [dayjs().startOf("month"), dayjs().startOf("day")] },
  { label: "Tahun Ini", value: [dayjs().startOf("year"), dayjs().startOf("day")] },
];
