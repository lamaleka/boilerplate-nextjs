import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";

export function PrintAction() {
  const pritnMemo = () => {
    window.print();
  };
  const back = () => {
    window.close();
  };
  return (
    <Flex justify="center" className="non-printable-area" gap={12} style={{ marginTop: 20 }}>
      <Button onClick={back} icon={<ArrowLeftOutlined />}>
        Kembali
      </Button>
      <Button onClick={pritnMemo} type="primary" icon={<PrinterOutlined />}>
        Cetak
      </Button>
    </Flex>
  );
}
