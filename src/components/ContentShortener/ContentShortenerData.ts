import { post, get } from "../../utils/httputils.ts";
import { ContentShortenerRequest, ContentShortenerResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const CONTENT_SHORTENER_URL = "/api/content-shortener/text";

const generateShortContent = async (
  contentShortenerInput: ContentShortenerRequest,
  headers: Record<string, string | null>
): Promise<ContentShortenerResponse> => {
  try {
    const response: AxiosResponse = await post(
      CONTENT_SHORTENER_URL,
      contentShortenerInput,
      headers
    );
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

const getShortContent = async (
  id: string
): Promise<ContentShortenerResponse> => {
  try {
    const response: AxiosResponse = await get(CONTENT_SHORTENER_URL + "/" + id);

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

export { generateShortContent, getShortContent };
