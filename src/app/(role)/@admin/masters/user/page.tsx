"use client";

import { COLUMN, ENDPOINTS, ROUTES } from "@/constants";
import { usePagination } from "@/hooks";
import { useMutationCallbacks } from "@/hooks";
import { colsUserAll, useUserAll, useUserDelete, useUserResetPassword } from "@/presenter";
import { User } from "@/type";
import { DeleteOutlined, LockOutlined, ReloadOutlined } from "@ant-design/icons";
import { App, Button, Card, Flex, Space, Spin, Table, Tooltip } from "antd";
import Link from "next/link";

export default function UserPage() {
  const { modal } = App.useApp();
  const { params, isLoading, data, refetch, onTableChange, handleSearch, resetPagination, pagination } = usePagination<User>({
    fetcher: useUserAll,
    queryKeyParams: [ENDPOINTS.masters.user.base, "UserAll"],
  });
  const deleteMutation = useUserDelete();
  const resetPasswordMutation = useUserResetPassword();
  const deleteCallback = useMutationCallbacks({ callback: () => refetch() });
  const resetPasswordCallback = useMutationCallbacks({ callback: () => refetch() });
  const deleteUser = async (record: User) => {
    modal.confirm({
      title: `Hapus ${record?.employee?.nama}?`,
      content: `Apakah Anda yakin ingin menghapus pengguna ini?`,
      okType: "danger",
      onOk: () => deleteMutation.mutate(record.id, deleteCallback),
    });
  };
  const resetPassword = async (record: User) => {
    modal.confirm({
      title: `Reset Password ${record?.employee?.nama}?`,
      content: `Apakah Anda yakin ingin mereset password pengguna ini?`,
      okType: "danger",
      onOk: () => resetPasswordMutation.mutate(record.id, resetPasswordCallback),
    });
  };

  return (
    <Card
      title="Master Data User"
      styles={{ body: { padding: 0 } }}
      extra={[
        <Flex key="userExtra" align="center" justify="space-between" gap={10}>
          <Link href={ROUTES.masters.user.create}>
            <Button type="primary">Tambah</Button>
          </Link>
          <Space direction="vertical" size="middle">
            <Space.Compact>
              <Button icon={<ReloadOutlined />} onClick={resetPagination}>
                Reset Filter
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
          ...colsUserAll({ params, handleSearch }),
          {
            ...COLUMN.action,
            width: 90,
            render: (_: any, record: User) => (
              <Flex align="center" justify="center" gap={8}>
                <Tooltip title="Reset Password" color="blue">
                  <Button variant="filled" color="blue" onClick={() => resetPassword(record)} icon={<LockOutlined />} />
                </Tooltip>
                <Tooltip title="Hapus User" color="red">
                  <Button variant="filled" color="red" onClick={() => deleteUser(record)} icon={<DeleteOutlined />} />
                </Tooltip>
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
