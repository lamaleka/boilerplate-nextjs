"use client";
import { MediaOne } from "@/type";
import { InboxOutlined } from "@ant-design/icons";
import { App, Form, Upload, UploadFile, UploadProps } from "antd";
import path from "path";
import { useState } from "react";

const { Dragger } = Upload;

interface DraggableUploadProps {
  action: string;
  accept?: string;
  name: string;
  label?: string;
  initialValue?: string;
  onUploadSuccess?: (res?: MediaOne) => void;
}

export function DraggableUpload({ action, accept = ".pdf", name, label, initialValue, onUploadSuccess }: DraggableUploadProps) {
  const { message } = App.useApp();
  const [fileList, setFileList] = useState<UploadFile<MediaOne>[]>(initialValue ? [{ uid: initialValue, name: path.basename(initialValue), status: "done", url: `/api/media/${initialValue}` }] : []);

  const props: UploadProps<MediaOne> = {
    name: "file",
    action,
    fileList,
    method: "POST",
    maxCount: 1,
    accept: accept,
    listType: "picture",

    onChange: (info) => {
      if (info.file.status !== "removed") {
        const resFilename = `${info?.fileList[0]?.response?.data?.file_name}`;
        const url = `/api/media/${resFilename}`;
        setFileList(info?.fileList);
        const { status } = info.file;
        switch (status) {
          case "done":
            console.log(info);
            console.log(resFilename);
            setFileList([{ ...info?.fileList[0], url, name: path.basename(resFilename), fileName: path.basename(resFilename) }]);
            message.success("Uploaded successfully.");
            if (onUploadSuccess) {
              onUploadSuccess(info?.fileList[0]?.response);
            }
            break;
          case "error":
            message.error("Upload failed.");
            break;
        }
      } else {
        setFileList(fileList.filter((e) => e.uid !== info.file.uid));
      }
    },
  };
  const validateFile = () => {
    if (fileList.length === 0) {
      return Promise.reject(new Error("Silahkan upload file."));
    }
    if (fileList[0]?.status === "error") {
      return Promise.reject(new Error("Silahkan upload ulang file."));
    }
    return Promise.resolve();
  };

  return (
    <Form.Item name={name} label={label} rules={[{ validator: validateFile }]}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single upload. Strictly prohibited from uploading company data or other banned files.</p>
      </Dragger>
    </Form.Item>
  );
}
