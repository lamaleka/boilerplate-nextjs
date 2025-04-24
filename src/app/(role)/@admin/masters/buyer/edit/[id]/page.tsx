"use client";
import { useBuyerDetail, useBuyerUpdate } from "@/presenter";
import { BuyerRequest, SlugProps } from "@/type";
import { Button, Card, Form, Input, Spin } from "antd";
import { CardTitleWithNavBack } from "@/components";
import { useBuyerUpdateHandlers } from "./hook";
import { InputNumber } from "antd/lib";
import { use, useEffect } from "react";

export default function BuyerEditPage({ params }: SlugProps) {
  const { id } = use(params);
  const [form] = Form.useForm<BuyerRequest>();
  const mutation = useBuyerUpdate(id);
  const { saveUpdate } = useBuyerUpdateHandlers();

  const { isLoading, data: res } = useBuyerDetail(id);
  const validateNumber = (_: any, value: number | null) => {
    if (value === null || value === undefined) {
      return Promise.reject(new Error("Please enter a valid number"));
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (res?.data) {
      const detail = BuyerRequest.fromEntity(res?.data);
      form.setFieldsValue({
        name: detail?.name,
        code: detail?.code,
        tax_number: detail?.tax_number,
        description: detail?.description,
      });
    }
  }, [form, res?.data]);

  if (!res?.data) return null;

  return (
    <Spin spinning={mutation.isPending || isLoading}>
      <Card title={<CardTitleWithNavBack title="Ubah Data Buyer" />}>
        <Form key={res?.data?.id} form={form} onFinish={saveUpdate(mutation)} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} colon={false} style={{ width: "100%" }} initialValues={res?.data}>
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
            {/* <div className="ant-form-item-control-input ant-form-item-control-input-content">
              <IMaskInput
                key={res?.data?.tax_number}
                className="ant-input ant-input-outlined"
                mask={"00.000.000.0-000.000"}
                unmask={false}
                ref={ref}
                value={form.getFieldValue("tax_number")?.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})$/, "$1.$2.$3.$4-$5.$6")}
                inputRef={inputRef}
                onAccept={(value) => form.setFieldsValue({ tax_number: value })}
                placeholder="Masukkan NPWP"
              />
            </div> */}
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
