import { MediaOne } from "@/type";
import { type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { App, Tag, Typography, Upload } from "antd";
import { UploadFile, UploadProps } from "antd/lib";
import { RcFile } from "antd/lib/upload";

export type RcCustomRequestOptions<T = any> = Parameters<Exclude<UploadProps<T>["customRequest"], undefined>>[0];

import { useState } from "react";
const { Text } = Typography;
export interface UploadHandlerProps {
  refetch: () => void;
  viewHook: (id: string) => UseQueryResult<string, Error> & { queryKey: string[] };
  uploadHook?: (id: string) => UseMutationResult<MediaOne, Error, File, unknown>;
}
export function useUploadMemo({ refetch, viewHook, uploadHook }: UploadHandlerProps) {
  const { message, modal } = App.useApp();
  const [id, setId] = useState("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [viewAttachmentOpen, setViewAttachmentOpen] = useState(false);
  const [uploadAttachmentOpen, setUploadAttachmentOpen] = useState(false);
  const view = viewHook(id);
  const upload = uploadHook?.(id);
  const [retryFile, setRetryFile] = useState<RcFile | null>(null);

  const beforeUpload: UploadProps["beforeUpload"] = (file: RcFile) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("You can only upload PDF files!");
      return Upload.LIST_IGNORE;
    }
    const newFile: UploadFile<any> = {
      uid: file.uid,
      name: file.name,
      status: "uploading",
      size: file.size,
      type: file.type,
    };

    setFileList([...fileList, newFile]);

    return new Promise((resolve, reject) => {
      modal.confirm({
        title: "Upload Memo?",
        content: (
          <Text>
            Status <Tag color="red">Belum Lunas</Tag> akan berubah menjadi <Tag color="green">Lunas</Tag> setelah anda mengupload memo!
          </Text>
        ),
        okText: "Lanjutkan",
        cancelText: "Batal",
        onOk: () => resolve(file),
        onCancel: () => {
          setFileList(fileList.filter((item) => item.uid !== file.uid));
          reject(Upload.LIST_IGNORE);
        },
      });
    });
  };

  const viewAttachment = (fileName: string) => {
    setId(fileName);
    setViewAttachmentOpen(true);
  };

  const uploadAttachment = (id: string) => {
    setId(id);
    setUploadAttachmentOpen(true);
  };

  const customRequest: UploadProps["customRequest"] = async ({ file, onSuccess, onError }) => {
    const fileToUpload = file as RcFile;
    if (!fileToUpload) return;
    upload?.mutate(fileToUpload, {
      onSuccess: (data: MediaOne) => {
        setId(data.data.file_name);
        const timer = setTimeout(() => {
          view.refetch();
          onSuccess?.(data.data.file_name);
          setUploadAttachmentOpen(false);
          viewAttachment(data.data.file_name);
          setFileList([]);
          refetch();
        }, 250);
        return () => clearTimeout(timer);
      },
      onError: (e: Error) => {
        const error = e as Error;
        setRetryFile(fileToUpload);
        onError?.(error);
      },
    });
  };
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // inside handleRetry
  const handleRetry = () => {
    if (!retryFile) return;
    const updatedFile: UploadFile<any> = {
      uid: retryFile.uid,
      size: retryFile.size,
      name: retryFile.name,
      type: retryFile.type,
      fileName: retryFile.name,
      lastModified: retryFile.lastModified,
      lastModifiedDate: retryFile.lastModifiedDate,
      status: "uploading",
    };
    setFileList([updatedFile]);
    const retryUploadOptions: RcCustomRequestOptions = {
      file: retryFile,
      filename: "file",
      action: "",
      data: {},
      headers: {},
      withCredentials: true,
      onError: (error) => {
        setFileList([{ ...updatedFile, status: "error", error }]);
      },
      method: "POST",
    };

    customRequest(retryUploadOptions);
  };

  const uploadProps: UploadProps = {
    customRequest,
    showUploadList: true,
    maxCount: 1,
    accept: ".pdf",
    listType: "picture",
    multiple: false,
    beforeUpload,
    fileList,
    onChange,
  };
  return {
    viewAttachmentOpen,
    setViewAttachmentOpen,
    setUploadAttachmentOpen,
    uploadAttachmentOpen,
    view,
    upload,
    uploadProps,
    viewAttachment,
    uploadAttachment,
    id,
    beforeUpload,
    customRequest,
    setId,
    handleRetry,
  };
}
