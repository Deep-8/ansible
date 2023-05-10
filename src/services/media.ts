
import { axiosInstance } from "@/utils/interceptor";
export const getUploadUrls = async (payload:any) => {
    const { query } = payload;
    const url = `/v1/profiles/media/upload-urls?n=${query.n}&mimeType=${query.mimeType}`;
    return axiosInstance
      .get(url)
      .then((res) => res)
      .catch((error) => {
        return error;
      });
  };

  export const registerMedia = async (payload :any) => {
    return axiosInstance
      .post(`/media/register`, payload)
      .then((res) => res)
      .catch((error) => {
        return error;
      });
  };

