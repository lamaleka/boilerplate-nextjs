import { UploadOutlined } from "@ant-design/icons";
import { App, Button, Upload } from "antd";

export function BasicUpload({ action }: { action: string }) {
  const { message } = App.useApp();
  return (
    <Upload
      name="file"
      action={action}
      method="POST"
      maxCount={1}
      onChange={(info) => {
        const { status } = info.file;
        switch (status) {
          case "done":
            message.success("Uploaded successfully.");
            break;
          case "error":
            message.error("Upload failed.");
            break;
        }
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}
