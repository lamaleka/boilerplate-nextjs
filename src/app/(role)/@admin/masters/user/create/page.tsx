"use client";
import { CardTitleWithNavBack, DebounceSelect } from "@/components";
import { useDropdownAllBuyerUnregistered, useDropdownAllEmployeeUnregistered, useDropdownAllRole, useUserCreate } from "@/presenter";
import { Buyer, Employee, KeyValue, UserCreate } from "@/type";
import { Button, Card, Form, Input, Radio, Spin } from "antd";
import { usePlantCreateHandlers } from "./hook";

export default function PlantCreatePage() {
  const mutation = useUserCreate();
  const [form] = Form.useForm<UserCreate>();
  const { saveCreate, isEmployee } = usePlantCreateHandlers(form);
  return (
    <Spin spinning={mutation.isPending}>
      <Card title={<CardTitleWithNavBack title="Buat Pengguna Baru" />}>
        <Form form={form} onFinish={saveCreate(mutation)} autoComplete="off" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} colon={false} style={{ width: "100%" }} initialValues={{ sso: 1 }}>
          <Form.Item
            label="Role"
            name="role_type"
            rules={[
              {
                required: true,
              },
            ]}
            required
          >
            <DebounceSelect<KeyValue<number>>
              showSearch
              placeholder="Cari role"
              fetchFn={useDropdownAllRole}
              labelInValue={false}
              optionsItem={(value) =>
                value.map((v) => ({
                  key: v.value,
                  value: v.value,
                  label: v.label,
                }))
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Karyawan"
            name="employee_id"
            rules={[
              {
                required: isEmployee,
              },
            ]}
            required
            hidden={!isEmployee}
          >
            <DebounceSelect<Employee>
              showSearch
              placeholder="Cari Karyawan"
              fetchFn={useDropdownAllEmployeeUnregistered}
              labelInValue={false}
              optionsItem={(value) =>
                value.map((v) => ({
                  key: v.id,
                  value: v.id,
                  label: `${v.badge} - ${v.nama}`,
                }))
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Vendor"
            name="vendor_id"
            rules={[
              {
                required: !isEmployee,
              },
            ]}
            required
            hidden={isEmployee}
          >
            <DebounceSelect<Buyer>
              showSearch
              placeholder="Cari vendor"
              labelInValue={false}
              fetchFn={useDropdownAllBuyerUnregistered}
              optionsItem={(value) =>
                value.map((v) => ({
                  key: v.id,
                  value: v.id,
                  label: v.name,
                }))
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            name="password_confirm"
            label="Konfirmasi Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Silahkan konfirmasi password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password tidak cocok!"));
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new-password-confirm" />
          </Form.Item>
          <Form.Item label="SSO" name="sso" required hidden={!isEmployee}>
            <Radio.Group size="large">
              <Radio.Button value={1}>SSO</Radio.Button>
              <Radio.Button value={2}>NON-SSO</Radio.Button>
            </Radio.Group>
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
