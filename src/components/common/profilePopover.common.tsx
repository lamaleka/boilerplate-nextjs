"use client";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Popover, Tag, Typography } from "antd";
import { useState } from "react";
import { RoleTypeColor, ROUTES } from "@/constants";
import { slugToTitleCase } from "@/utils";
import { useGetSession } from "@/hooks";
import Link from "antd/lib/typography/Link";
const { Title, Text } = Typography;

export function ProfilePopover() {
  const [open, setOpen] = useState(false);
  const { data: session } = useGetSession();
  const role = session?.roles?.[0];
  return (
    <Popover
      content={
        <Flex vertical align="center" style={{ minWidth: "200px" }}>
          <Avatar size={50} style={{ backgroundColor: "#014188", marginTop: "15px" }} icon={<UserOutlined />} />
          <Flex vertical align="center" style={{ margin: "0px 10px 10px 10px" }}>
            <Title level={5} style={{ margin: "0" }}>
              {session?.preferred_name}
            </Title>
            {role && (
              <Tag color={RoleTypeColor[role]} key={role} style={{ marginRight: 0 }}>
                {slugToTitleCase(role)}
              </Tag>
            )}
            <Text style={{ margin: "0", fontSize: "14px" }}>{session?.username}</Text>
          </Flex>
          <Link href={ROUTES.auth.logout} style={{ width: "100%" }}>
            <Button style={{ width: "100%" }} variant="outlined" danger>
              Logout
            </Button>
          </Link>
        </Flex>
      }
      trigger="hover"
      open={open}
      onOpenChange={setOpen}
    >
      <Flex style={{ gap: "5px" }} align="center">
        <Flex align="flex-end" justify="end" vertical>
          <Title level={5} style={{ margin: "0", fontSize: "14px" }}>
            {session?.preferred_name}
          </Title>
          {role && (
            <Tag color={RoleTypeColor[role]} key={role} style={{ marginRight: 0 }}>
              {slugToTitleCase(role)}
            </Tag>
          )}
        </Flex>
        <Avatar style={{ backgroundColor: "#014188", cursor: "pointer" }} icon={<UserOutlined />} />
      </Flex>
    </Popover>
  );
}
