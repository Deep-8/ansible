import { Upload } from "antd";
import React, { ReactNode } from "react";
import useUploader from "./useUploader";
interface IUpload {
  listType?: "picture-circle" | "picture" | undefined;
  handleUploadSuccess: (any: any) => void;
  handleUploadFailedOrDelete: () => void;
  uploadButton: ReactNode;
  accept: string;
  alreadyUploadedfile: {
    slug: string;
    key: string;
  }; // empty if no value
  wrapperClassName?: string; // use to over ride classes
}
const Uploader = ({
  handleUploadSuccess,
  wrapperClassName,
  listType,
  uploadButton,
  accept,
  alreadyUploadedfile,
  handleUploadFailedOrDelete,
}: IUpload) => {
  const { onChange, onRemove, beforeUpload, onPreview, uploadFile, fileList } =
    useUploader({
      handleUploadSuccess,
      handleUploadFailedOrDelete,
      alreadyUploadedfile,
    });

  return (
    <Upload
      maxCount={1}
      multiple={false}
      accept={accept}
      listType={listType}
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
      onRemove={onRemove}
      customRequest={uploadFile}
      beforeUpload={beforeUpload}
      className={wrapperClassName}
    >
      {fileList.length === 1 ? null : uploadButton}
    </Upload>
  );
};

export default Uploader;
