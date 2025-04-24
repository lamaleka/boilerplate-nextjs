import { useState } from "react";

export const useTaxNumberFormater = () => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(formatter(e.target.value));
  };

  const formatter = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d)(\d{3})(\d{3})/, "$1.$2.$3.$4-$5.$6");
  };

  const rawValue = (formattedValue: string): string => {
    return formattedValue.replace(/[^0-9]/g, "");
  };

  return { value, onChange, rawValue };
};
