import { useState } from "react";
import { Flex, Input, Tag } from "antd";
import { InputProps } from "antd/lib";

interface ChipInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  inputProps?: InputProps;
}

export const ChipInput: React.FC<ChipInputProps> = ({ value = [], onChange, inputProps }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "," || e.key === " ") && inputValue.trim()) {
      e.preventDefault();
      // const newValue = [...(value || []), inputValue.trim()];
      // onChange?.(newValue);
      // setInputValue("");
      const trimmedValue = inputValue.trim();
      const isDuplicate = value.some((item) => item.toLowerCase() === trimmedValue.toLowerCase());

      // Only add if it's not a duplicate
      if (!isDuplicate) {
        const newValue = [...(value || []), trimmedValue];
        onChange?.(newValue);
      }

      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value?.length > 0) {
      const newValue = [...value];
      newValue.pop();
      onChange?.(newValue);
    }
  };

  const handleTagClose = (removedIndex: number) => {
    const newValue = value.filter((_, index) => index !== removedIndex);
    onChange?.(newValue);
  };

  return (
    <Flex vertical>
      <Input value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Ketik dan tekan (koma) atau (spasi) untuk menambahkan" {...inputProps} />
      {value?.length > 0 && (
        <Flex wrap="wrap" gap={4}>
          {value.map((chip, index) => (
            <Tag
              style={{ marginTop: 8 }}
              key={index}
              color="blue"
              closable
              onClose={(e) => {
                e.preventDefault();
                handleTagClose(index);
              }}
            >
              {chip}
            </Tag>
          ))}
        </Flex>
      )}
    </Flex>
  );
};
