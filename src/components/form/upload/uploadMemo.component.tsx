"use client";
import { useUploadMemo } from "@/hooks";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";

export function UploadMemo({ uploadHandler }: { uploadHandler: ReturnType<typeof useUploadMemo> }) {
  const { setId, uploadAttachmentOpen, setUploadAttachmentOpen, upload, uploadProps, view, viewAttachmentOpen, setViewAttachmentOpen, id, handleRetry } = uploadHandler;
  return (
    <>
      {upload && (
        <Modal
          onClose={() => setId("")}
          title="Upload Arsip Memo"
          centered
          open={uploadAttachmentOpen}
          onCancel={() => setUploadAttachmentOpen(false)}
          closable={!upload?.isPending}
          maskClosable={!upload?.isPending}
          width="40vw"
          footer={[
            upload?.error && (
              <Button icon={<CloudUploadOutlined />} disabled={upload?.isPending} key="tryAgain" color="primary" variant="dashed" onClick={handleRetry}>
                Coba Lagi
              </Button>
            ),
            <Button disabled={upload?.isPending} key="back" onClick={() => setUploadAttachmentOpen(false)}>
              Tutup
            </Button>,
          ]}
        >
          <Upload {...uploadProps} disabled={upload?.isPending}>
            <Button type="default" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Modal>
      )}

      <Modal
        onClose={() => setId("")}
        loading={view.isLoading || view.isRefetching}
        title="Arsip Memo"
        centered
        open={viewAttachmentOpen}
        onCancel={() => setViewAttachmentOpen(false)}
        closable={true}
        width="80vw"
        modalRender={(modal) => <div style={{ height: "90vh", display: "flex", flexDirection: "column" }}>{modal}</div>}
        style={{
          top: 0,
          height: "90vh",
          maxWidth: "80vw",
          padding: 0,
        }}
        styles={{
          body: {
            height: "calc(80vh - 55px)", // Subtract modal header height
            padding: 0,
            overflow: "hidden",
          },
        }}
        footer={[
          upload && (
            <Button
              key="change"
              type="primary"
              onClick={() => {
                setId(id.replace(/\.pdf$/, ""));
                setViewAttachmentOpen(false);
                setUploadAttachmentOpen(true);
              }}
            >
              Ubah
            </Button>
          ),
          <Button key="back" onClick={() => setViewAttachmentOpen(false)}>
            Tutup
          </Button>,
        ]}
      >
        <iframe src={view?.data} width="100%" height="100%" title="PDF Viewer" />
      </Modal>
    </>
  );
}
