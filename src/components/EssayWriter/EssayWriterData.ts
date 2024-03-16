import { post, get } from "../../utils/httputils.ts";
import { EssayWriterRequest, EssayWriterResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const ESSAY_WRITER_URL = import.meta.env.VITE_ESSAY_WRITER_URL + "/text";

const generateEssay = async (
  essayWriterInput: EssayWriterRequest,
  headers: Record<string, string | null>
): Promise<EssayWriterResponse> => {
  try {
    const response: AxiosResponse = await post(
      ESSAY_WRITER_URL,
      essayWriterInput,
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

const getEssay = async (id: string): Promise<EssayWriterResponse> => {
  try {
    const response: AxiosResponse = await get(ESSAY_WRITER_URL + "/" + id);

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

export { generateEssay, getEssay };
