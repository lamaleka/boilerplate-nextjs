import { Switch } from "antd";

export const renderIsActive = <T,>(value: boolean, record: T, onChange: (record: T) => void): React.ReactNode => {
  return <Switch checked={value} checkedChildren="Aktif" unCheckedChildren="Nonaktif" onChange={() => onChange(record)} />;
};
