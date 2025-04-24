export const formatNumberCurrency = (num?: number, fractionDigits?: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: fractionDigits ?? 0,
  }).format(num ?? 0);
};
export const formatNumber = (num?: number) => {
  return Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(num ?? 0);
};

/**
 * Formats a number with periods (.) as thousand separators and commas (,) as decimal separators
 * @param value The number value to format
 * @returns Formatted string representation
 */
export const formatInputNumber = (value: number | string | undefined): string => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  // Convert to string and split into integer and decimal parts
  const stringValue = `${value}`;
  const parts = stringValue.split(".");

  // Format integer part with period thousand separators
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return integerPart;
};
export const formatInputNumberWithComma = (value: number | string | undefined): string => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  // Convert to string and split into integer and decimal parts
  const stringValue = `${value}`;
  const parts = stringValue.split(".");

  // Format integer part with period thousand separators
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // If there's a decimal part, append it with a comma
  if (parts.length > 1) {
    return `${integerPart},${parts[1]}`;
  }

  return integerPart;
};

/**
 * Parses a string with period (.) thousand separators and comma (,) decimal separator back into a number
 * @param value The formatted string to parse
 * @returns String representation compatible with JavaScript number conversion
 */
export const parseInputNumber = (value: string | undefined): string => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  // First, remove all periods (thousand separators)
  let result = value.replace(/\./g, "");

  // Then, replace comma with period for decimal (to make it compatible with JS number parsing)
  result = result.replace(/,/, ".");

  return result;
};
