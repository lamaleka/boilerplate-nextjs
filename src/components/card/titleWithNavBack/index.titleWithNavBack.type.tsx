"use client";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useRouter } from "next/navigation";

export function CardTitleWithNavBack({ title }: { title: string }) {
  const router = useRouter();
  return (
    <Flex align="center" gap={10}>
      <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={router.back} />
      {title}
    </Flex>
  );
}
