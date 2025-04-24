"use client";
import { CardTitleWithNavBack } from "@/components";
import { useBuyerCreate } from "@/presenter";
import { BuyerRequest } from "@/type";
import { Button, Card, Form, Input, InputNumber, Spin } from "antd";
import { useBuyerCreateHandlers } from "./hook";

export default function BuyerCreatePage() {
  const validateNumber = (_: any, value: number | null) => {
    if (value === null || value === undefined) {
      return Promise.reject(new Error("Hanya boleh angka"));
    }
    return Promise.resolve();
  };

  const mutation = useBuyerCreate();
  const [form] = Form.useForm<BuyerRequest>();
  const { saveCreate } = useBuyerCreateHandlers();

  return (
    <Spin spinning={mutation.isPending}>
      <Card title={<CardTitleWithNavBack title="Tambah Data Buyer" />}>
        <Form form={form} onFinish={saveCreate(mutation)} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} colon={false} style={{ width: "100%" }}>
          <Form.Item
            label="Nama Buyer"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Nama vendor" />
          </Form.Item>
          <Form.Item
            label="Kode Buyer"
            name="code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Kode vendor" />
          </Form.Item>
          <Form.Item
            label="NPWP"
            name="tax_number"
            rules={[
              {
                required: true,
              },
              {
                validator: validateNumber,
              },
            ]}
          >
            <InputNumber placeholder="NPWP 15 Digit" maxLength={15} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Deskripsi" name="description">
            <Input.TextArea placeholder="Deskripsi" />
          </Form.Item>
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
}
