import { get } from "../../utils/httputils.ts";
import { BlogResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const BLOG_URL = import.meta.env.VITE_BLOG_URL + "/blog";

const getBlog = async (id: string): Promise<BlogResponse> => {
  try {
    const response: AxiosResponse = await get(BLOG_URL + "/" + id);

    if (response && response.status && response.status == 200) {
      return {
        id: response.data.id,
        content: response.data.content,
        statusCode: response.status,
        statusText: response.statusText,
      };
    }

    return genericErrorRepsonse();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        id: "",
        content: "",
        statusCode: error.response.status,
        statusText: error.response.statusText,
      };
    }

    return genericErrorRepsonse();
  }
};

const genericErrorRepsonse = () => {
  return {
    id: "",
    content: "",
    statusCode: 500,
    statusText: "generic error",
  };
};

export { getBlog };
