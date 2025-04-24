"use client";

import { COLUMN, ENDPOINTS, ROUTES } from "@/constants";
import { usePagination } from "@/hooks";
import { useMutationCallbacks } from "@/hooks";
import { colsBuyerAll, useBuyerAll, useBuyerDelete } from "@/presenter";
import { Buyer } from "@/type";
import { DeleteOutlined, EditOutlined, ReloadOutlined, StopOutlined } from "@ant-design/icons";

import { App, Button, Card, Flex, Space, Spin, Table } from "antd";
import Link from "next/link";

export default function BuyerPage() {
  const { modal } = App.useApp();
  const p = usePagination<Buyer>({
    fetcher: useBuyerAll,
    queryKeyParams: [ENDPOINTS.masters.buyer.base, "BuyerAll"],
  });
  const deleteMutation = useBuyerDelete();
  const deleteCallback = useMutationCallbacks({ callback: () => p.refetch() });
  const deleteBuyer = async (record: Buyer) => {
    modal.confirm({
      title: `Hapus ${record.name}?`,
      content: `Apakah Anda yakin ingin menghapus buyer?`,
      okType: "danger",
      onOk: () => deleteMutation.mutate(record.id, deleteCallback),
    });
  };

  return (
    <Card
      title="Master Data Buyer"
      styles={{ body: { padding: 0 } }}
      extra={[
        <Flex key="buyerExtra" align="center" justify="space-between" gap={10}>
          <Link href={ROUTES.masters.buyer.create}>
            <Button type="primary">Tambah</Button>
          </Link>
          <Space direction="vertical" size="middle">
            <Space direction="vertical" size="middle">
              <Space.Compact>
                <Button icon={<StopOutlined />} onClick={p.resetPagination}>
                  Reset Filter
                </Button>
                <Button icon={<ReloadOutlined />} onClick={() => p.refetch()}>
                  Muat Ulang
                </Button>
              </Space.Compact>
            </Space>
          </Space>
        </Flex>,
      ]}
    >
      <Table
        size="small"
        tableLayout="fixed"
        rowKey="id"
        columns={[
          ...colsBuyerAll({ params: p.params, handleSearch: p.handleSearch }),
          {
            ...COLUMN.action,
            width: 90,
            render: (_: any, record: Buyer) => (
              <Flex align="center" justify="center" gap={8}>
                <Link href={ROUTES.masters.buyer.edit(record.id)}>
                  <Button variant="filled" color="orange" icon={<EditOutlined />} />
                </Link>
                <Button variant="filled" color="red" onClick={() => deleteBuyer(record)} icon={<DeleteOutlined />} />
              </Flex>
            ),
          },
        ]}
        loading={{
          indicator: <Spin />,
          spinning: p.isLoading,
        }}
        onChange={p.onTableChange}
        scroll={{ x: "max-content", y: 55 * 10 }}
        dataSource={p.data?.data}
        pagination={p.pagination}
      />
    </Card>
  );
}
