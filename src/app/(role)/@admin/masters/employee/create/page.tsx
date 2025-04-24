"use client";
import { CardTitleWithNavBack, DebounceSelect } from "@/components";
import { useDropdownAllEmployee, useEmployeeCreate } from "@/presenter";
import { Employee, EmployeeRequest } from "@/type";
import { Button, Card, Flex, Form, Input, Radio, Spin } from "antd";
import { useEmployeeCreateHandlers } from "./hook";
import { EmployeeType } from "@/constants";
import { DefaultOptionType } from "antd/lib/select";

export default function EmployeeCreatePage() {
  const mutation = useEmployeeCreate();
  const [form] = Form.useForm<EmployeeRequest>();
  const { saveCreate, employeeType, onEmployeeTypeChange } = useEmployeeCreateHandlers();
  return (
    <Spin spinning={mutation.isPending}>
      <Card title={<CardTitleWithNavBack title="Tambah Data Karyawan" />}>
        <Form form={form} onFinish={saveCreate(mutation)} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} colon={false} style={{ width: "100%" }} initialValues={{ employee_type: employeeType }}>
          <Form.Item label="Jenis Karyawan" name="employee_type" required>
            <Radio.Group size="large" onChange={onEmployeeTypeChange} value={employeeType}>
              <Radio.Button value={EmployeeType.TKO}>TKO</Radio.Button>
              <Radio.Button value={EmployeeType.TKNO}>TKNO</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Data Karyawan" name="employee_dropdown" hidden={!(employeeType === EmployeeType.TKO)}>
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
