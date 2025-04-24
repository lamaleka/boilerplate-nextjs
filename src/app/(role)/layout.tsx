"use client";

import { Button, Flex, Menu, Result, Typography } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { AppMenuItem, MenuItem } from "@/type";
import { ProfilePopover, LoadingWrapper, menuAdmin, menuOfficer, menuBuyer } from "@/components";
import { ROUTES } from "@/constants";
import { useGetSession } from "@/hooks";

const { Title } = Typography;

export default function DashboardLayout({
  children,
  admin,
  officer,
  buyer,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  officer: React.ReactNode;
  buyer: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, isLoading, isError } = useGetSession();
  const router = useRouter();
  const path = usePathname();

  const menuMap: Record<string, AppMenuItem[]> = {
    admin: menuAdmin,
    officer: menuOfficer,
    buyer: menuBuyer,
    "": [],
  };
  const layoutMap: Record<string, ReactNode> = {
    admin: admin,
    officer: officer,
    buyer: buyer,
    "": children,
  };
  const menu = menuMap[session?.roles?.[0] ?? ""];
  const layout = layoutMap[session?.roles?.[0] ?? ""];

  const findSelectedKeys = (items: AppMenuItem[], path: string): string[] => {
    const selected: string[] = [];
    const traverse = (items: AppMenuItem[]) => {
      items?.forEach((item) => {
        if (path.includes(item.path)) {
          selected.push(item.key);
        }
        if (item.children) {
          https: traverse(item.children);
        }
      });
    };
    traverse(items);
    return selected;
  };

  const findOpenKeys = (items: AppMenuItem[], path: string): string[] => {
    const openKeys: string[] = [];
    const traverse = (items: AppMenuItem[]) => {
      items?.forEach((item) => {
        if (item.children) {
          if (item.children.some((child) => path.includes(child.path))) {
            openKeys.push(item.key);
          }
          traverse(item.children);
        }
      });
    };
    traverse(items);
    return openKeys;
  };

  const convertToAntdItems = (items: AppMenuItem[]): MenuItem[] => {
    return items?.map((item) => ({
      key: item.key,
      icon: item.icon,
      children: item.children ? convertToAntdItems(item.children) : undefined,
      label: item.path == "#" ? item.label : <Link href={item.path}>{item.label}</Link>,
    }));
  };

  if (isLoading) {
    return <LoadingWrapper fullScreen />;
  }
  if (isError) {
    return (
      <Flex align="center" justify="center" style={{ width: "100vw", height: "100vh" }}>
        <Result
          status="403"
          title="Unauthorized"
          subTitle="Oops! Unauthorized. Please login to access this page."
          extra={
            <Button type="primary" onClick={() => router.replace(ROUTES.auth.login)}>
              Login
            </Button>
          }
        />
      </Flex>
    );
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{
          background: "#014188",
          height: "100vh",
          // overflow: "auto",
          position: "sticky",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          zIndex: 999,
        }}
      >
        <Button
          type="text"
          shape="circle"
          size="small"
          icon={collapsed ? <CaretRightFilled style={{ color: "#fff" }} /> : <CaretLeftFilled style={{ color: "#fff" }} />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "absolute",
            top: "18px",
            padding: "12px",
            right: "-10px",
            background: "#014188",
            zIndex: 999,
          }}
        />
        <Flex justify="center" align="center" style={{ width: "100%", padding: collapsed ? `15% 10%` : `5% 10%` }}>
          <Image
            src={collapsed ? "/logo/logo_small.svg" : "/logo/logo_large.svg"}
            priority={true}
            placeholder="empty"
            alt="Company Logo"
            height={92}
            width={391}
            style={{
              height: "100%",
              width: "auto",
              maxHeight: "40px",
              maxWidth: "100%",
            }}
          />
        </Flex>

        <Menu
          selectedKeys={findSelectedKeys(menu, path)}
          defaultOpenKeys={findOpenKeys(menu, path)}
          // openKeys={findOpenKeys(menu, path)}
          items={convertToAntdItems(menu)}
          style={{ borderInlineEnd: 0, width: "100%" }}
          mode="inline"
          inlineCollapsed={collapsed}
        />
      </Sider>
      <Layout>
        <Header
          onDoubleClick={() => setCollapsed(!collapsed)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 25px 0 25px",
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 3,
          }}
        >
          <Title level={3} style={{ margin: 0, padding: 0, color: "#014188" }}>
            Title
          </Title>
          <ProfilePopover />
        </Header>

        <Content style={{ padding: "25px ", borderRadius: "50px 0 0 50px" }}>{layout}</Content>
      </Layout>
    </Layout>
  );
}
