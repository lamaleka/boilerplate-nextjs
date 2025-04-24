"use client";
import { useDropdownAllEmployee, useEmployeeDetail, useEmployeeUpdate } from "@/presenter";
import { Employee, EmployeeRequest, SlugProps } from "@/type";
import { Button, Card, Flex, Form, Input, Spin } from "antd";
import { CardTitleWithNavBack, DebounceSelect } from "@/components";
import { useEmployeeUpdateHandlers } from "./hook";
import { EmployeeType } from "@/constants";
import { Radio } from "antd/lib";
import { DefaultOptionType } from "antd/lib/select";
import { use, useEffect } from "react";

export default function PlantEditPage({ params }: SlugProps) {
  const { id } = use(params);
  const [form] = Form.useForm<EmployeeRequest>();
  const mutation = useEmployeeUpdate(id);
  const { saveUpdate } = useEmployeeUpdateHandlers();
  const { isLoading, data: res } = useEmployeeDetail(id);
  const employeeType = Form.useWatch("employee_type", form);

  useEffect(() => {
    const detail = EmployeeRequest.fromEntity(res?.data);
    form.setFieldsValue({
      badge: detail.badge,
      dept_id: detail.dept_id,
      dept_title: detail.dept_title,
      nama: detail.nama,
      email: detail.email,
      pos_id: detail.pos_id,
      pos_title: detail.pos_title,
      employee_type: detail.employee_type,
    });
  }, [form, res?.data]);

  if (!res?.data) return null;

  return (
    <Spin spinning={mutation.isPending || isLoading || !res}>
      <Card title={<CardTitleWithNavBack title="Tambah Data Karyawan" />}>
        <Form key={res.data.id} form={form} onFinish={saveUpdate(mutation)} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} colon={false} style={{ width: "100%" }}>
          <Form.Item label="Jenis Karyawan" name="employee_type" required>
            <Radio.Group size="large" value={employeeType}>
              <Radio.Button value={EmployeeType.TKO}>TKO</Radio.Button>
              <Radio.Button value={EmployeeType.TKNO}>TKNO</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Data Karyawan" name="employee_dropdown" hidden={employeeType != EmployeeType.TKO}>
            <DebounceSelect<Employee>
              showSearch
              placeholder="Cari Karyawan"
              fetchFn={useDropdownAllEmployee}
              labelInValue={false}
              optionsItem={(value) =>
                value.map((v) => ({
                  key: v.badge_uid,
                  value: JSON.stringify(v),
                  label: `${v.badge} - ${v.nama}`,
                }))
              }
              onSelect={(value: DefaultOptionType) => {
                const employee = JSON.parse(value.toString());
                form.setFieldsValue({
                  nama: employee.nama,
                  badge: employee.badge,
                  dept_id: employee.dept_id,
                  dept_title: employee.dept_title,
                  email: employee.email,
                  pos_id: employee.pos_id,
                  pos_title: employee.pos_title,
                });
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Nama"
            name="nama"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Input nama" />
          </Form.Item>
          <Form.Item
            label="Badge"
            name="badge"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input maxLength={8} placeholder="Input nomor badge" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input placeholder="Input email" />
          </Form.Item>
          <Form.Item name="dept_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Departemen"
            name="dept_title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Input nama departemen" />
          </Form.Item>
          <Form.Item name="pos_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Posisi"
            name="pos_title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Input posisi" />
          </Form.Item>
          <Form.Item label=" ">
            <Flex gap={8}>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
              <Button type="default" htmlType="reset">
                Reset
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
}
