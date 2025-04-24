"use client";

import { ColIsActive } from "@/components/columns/column/colIsActive.column";
import { COLUMN, ENDPOINTS, ROUTES } from "@/constants";
import { usePagination } from "@/hooks";
import { useMutationCallbacks } from "@/hooks";
import { colsEmployeeAll, useEmployeeAll, useEmployeeUpdateStatus } from "@/presenter";
import { Employee } from "@/type";
import { EditOutlined, ReloadOutlined, StopOutlined } from "@ant-design/icons";
import { App, Button, Card, Flex, Space, Spin, Table } from "antd";
import Link from "next/link";

export default function EmployeePage() {
  const { modal } = App.useApp();
  const { params, isLoading, data, refetch, onTableChange, handleSearch, resetPagination, pagination } = usePagination<Employee>({
    fetcher: useEmployeeAll,
    queryKeyParams: [ENDPOINTS.masters.employee.base, "EmployeeAll"],
  });
  const updateStatusMutation = useEmployeeUpdateStatus();
  const updateStatusCallback = useMutationCallbacks({ callback: () => refetch() });
  const updateEmployeeStatus = async (record: Employee) => {
    const status = record.is_active ? "Nonaktifkan" : "Aktifkan";
    modal.confirm({
      title: `${status} ${record.nama}?`,
      content: `Apakah Anda yakin ingin ${status.toLowerCase()} karyawan?`,
      okType: "danger",
      onOk: () => updateStatusMutation.mutate(record.id, updateStatusCallback),
    });
  };

  return (
    <Card
      title="Master Data Karyawan"
      styles={{ body: { padding: 0 } }}
      extra={[
        <Flex key="employeeExtra" align="center" justify="space-between" gap={10}>
          <Link href={ROUTES.masters.employee.create}>
            <Button type="primary">Tambah</Button>
          </Link>
          <Space direction="vertical" size="middle">
            <Space.Compact>
              <Button icon={<StopOutlined />} onClick={resetPagination}>
                Reset Filter
              </Button>
              <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
                Muat Ulang
              </Button>
            </Space.Compact>
          </Space>
        </Flex>,
      ]}
    >
      <Table
        size="small"
        tableLayout="fixed"
        rowKey="id"
        columns={[
          ...colsEmployeeAll({ params, handleSearch }),
          ColIsActive<Employee>({ onClick: updateEmployeeStatus }),
          {
            ...COLUMN.action,
            render: (_: any, record: Employee) => (
              <Flex align="center" justify="center" gap={8}>
                <Link href={ROUTES.masters.employee.edit(record.id)}>
                  <Button variant="filled" color="orange" icon={<EditOutlined />} />
                </Link>
              </Flex>
            ),
          },
        ]}
        loading={{
          indicator: <Spin />,
          spinning: isLoading,
        }}
        scroll={{ x: "max-content", y: 55 * 10 }}
        dataSource={data?.data}
        onChange={onTableChange}
        pagination={pagination}
      />
    </Card>
  );
}
