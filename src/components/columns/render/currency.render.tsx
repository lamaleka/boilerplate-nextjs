import { formatNumberCurrency } from "@/utils";
import { Typography } from "antd";

export const renderCurrency = (value: number) => {
  const currencyValue = formatNumberCurrency(value);
  return <Typography.Text>{currencyValue}</Typography.Text>;
};
