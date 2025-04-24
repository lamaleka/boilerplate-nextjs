import { Employee } from "@/type";
import { Tag, Typography } from "antd";

export const renderEmployee = (record?: Employee) => {
  if (!record) return null;
  return (
    <Typography.Text>
      <b>{record?.nama}</b>
      <Tag color={record?.is_active ? "green" : "default"} style={{ marginLeft: 4 }}>
        {record?.is_active ? "Aktif" : "Nonaktif"}
      </Tag>
      <br />
      {record?.pos_title}
    </Typography.Text>
  );
};
