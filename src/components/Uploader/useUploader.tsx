import { getUploadUrls } from "@/services/media";
import { message, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import { useEffect, useState } from "react";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const fileTypeList = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface IuseUploader {
  handleUploadFailedOrDelete: () => void;
  handleUploadSuccess: (any: any) => void;
  alreadyUploadedfile: { slug: string; key: string };
}
const useUploader = ({
  handleUploadSuccess,
  alreadyUploadedfile,
  handleUploadFailedOrDelete,
}: IuseUploader) => {
  const [fileList, setFiles] = useState<any>([]);
  const uploadFile = async (obj: any) => {
    const { file } = obj;
    const state = [
      {
        ...file,
        status: "uploading",
        name: file.name,
        percent: 0,
      },
    ];
    setFiles(state);
    const response = await getUploadUrls({
      query: { n: 1, mimeType: file.type },
    });
    const { data } = response.data;
    const storageObj = data[0];
    await axios
      .put(storageObj.url, file, {
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded * 100) / file.size;
          const state = [
            {
              ...file,
              status: "uploading",
              name: file.name,
              percent: progress,
            },
          ];
          setFiles(state);
        },
        headers: { "Content-Type": file.type },
      })
      .then(async (res) => {
        handleUploadSuccess(storageObj.key);
        const state = [
          {
            ...file,
            url: await getBase64(file),
            status: "done",
            name: file.name,
          },
        ];
        setFiles(state);
      })
      .catch((err) => {
        setFiles([
          {
            ...file,
            status: "error",
            name: file.name,
            err,
          },
        ]);
      });
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    if (src.includes("aws.com")) {
      // "already uploaded link via backend"
      window.open(src);
    } else if (src.split(",")[0].includes("pdf")) {
      // if pdf
      var iframe =
        "<iframe width='100%' height='100%' src='" + src + "'></iframe>";
      var x = window.open()!;
      x.document.open();
      x.document.write(iframe);
      x.document.close();
    } else if (src.split(",")[0].includes("word")) {
      // if doc file
      var link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = src;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      // if image
      const image = new Image();
      const imgWindow = window.open(src);
      image.src = src;
      imgWindow?.document.write(image.outerHTML);
    }
  };
  const onChange = (info: any) => {
    const { status, response } = info.file;
    if (status === "removed") {
      setFiles([]);
    } else if (status === "done") {
      message.success(`${info.file.name}​ file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name}​ file upload failed.`);
    }
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = fileTypeList.includes(file.type);
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onRemove = (file: any) => {
    setFiles([]);
    handleUploadFailedOrDelete();
    return false;
  };

  useEffect(() => {
    if (
      alreadyUploadedfile?.slug !== "" &&
      alreadyUploadedfile?.slug !== undefined
    ) {
      const state = [
        {
          url: alreadyUploadedfile?.slug,
          status: "done",
          name: "Uploaded Resume",
          key: alreadyUploadedfile?.key,
          uid: alreadyUploadedfile?.key,
        },
      ];
      setFiles(state);
    }
  }, [alreadyUploadedfile]);
  return {
    onChange,
    onPreview,
    uploadFile,
    fileList,
    setFiles,
    beforeUpload,
    onRemove,
  };
};

export default useUploader;
