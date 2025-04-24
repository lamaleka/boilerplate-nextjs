import { Flex, Spin, Typography } from "antd";

export function LoadingWrapper({ fullScreen = false }) {
  return (
    <Flex justify="center" align="center" style={{ width: "100%", height: fullScreen ? "100vh" : "100%" }} gap={12}>
      <Spin spinning={true} style={{ marginRight: 12 }} />
      <Typography.Text>Please wait ...</Typography.Text>
    </Flex>
  );
}
