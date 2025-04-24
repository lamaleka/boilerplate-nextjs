import { Card, Col, Flex, Typography } from "antd";
import React from "react";
import { ReactElement } from "react";

export interface DashboardMenuCardProps {
  icon: ReactElement;
  title: string;
  action?: () => void;
}

export function DashboardMenuCard({ icon, title, action }: DashboardMenuCardProps) {
  return (
    <Col xs={{ flex: "100%" }} sm={{ flex: "50%" }} md={{ flex: "40%" }} lg={{ flex: "20%" }} xl={{ flex: "15%" }} onClick={action}>
      <Card hoverable style={{ height: "100%" }} styles={{ body: { padding: "20px 12px" } }}>
        <Flex align="center" justify="center" gap={4} vertical>
          {/* {React.cloneElement(icon, {
            style: {
              fontSize: "30px",
              ...icon.props.style,
            },
          })} */}
          {React.isValidElement<{ style?: React.CSSProperties }>(icon) &&
            React.cloneElement(icon, {
              style: {
                fontSize: "30px",
                ...icon.props.style,
              },
            })}
          <Typography.Text style={{ textAlign: "center" }}>{title}</Typography.Text>
        </Flex>
      </Card>
    </Col>
  );
}
