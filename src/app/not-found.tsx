"use client";

import { ROUTES } from "@/constants";
import { useGetSession } from "@/hooks";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Flex, Result } from "antd";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const { data } = useGetSession();

  return (
    <Flex align="center" justify="center" style={{ width: "100vw", height: "100vh" }}>
      <Result
        status="404"
        title="404"
        subTitle="Oops! Halaman yang Anda cari tidak ditemukan."
        extra={
          <Flex gap={22}>
            <Button icon={<ArrowLeftOutlined />} type="default" onClick={() => router.back()}>
              Halaman Sebelumnya
            </Button>
            <Button type="primary" onClick={() => router.replace(ROUTES.dashboard)}>
              {data?.is_authenticated ? "Beranda" : "Login"}
            </Button>
          </Flex>
        }
      />
    </Flex>
  );
}
