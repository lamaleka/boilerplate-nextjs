import { Badge, Card, Flex, Tag, Typography } from "antd";
import { PresetStatusColorType } from "antd/lib/_util/colors";
const { Text, Title } = Typography;

interface StatisticCardProps {
  value: number;
  valueStatus: string;
  description: string;
  status: PresetStatusColorType;
}

export function StatisticCard({ value, valueStatus, description, status }: StatisticCardProps) {
  return (
    <Card style={{ width: "100%" }}>
      <Tag style={{ marginBottom: 6 }}>
        <Badge status={status} style={{ marginRight: 4 }} />
        {valueStatus}
      </Tag>
      <Flex vertical>
        <Title style={{ margin: 0 }}>{value}</Title>
        <Text>{description}</Text>
      </Flex>
    </Card>
  );
}
