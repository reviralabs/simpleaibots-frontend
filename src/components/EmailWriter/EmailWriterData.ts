import { post, get } from "../../utils/httputils.ts";
import { EmailWriterRequest, EmailWriterResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const EMAIL_WRITER_URL = import.meta.env.VITE_EMAIL_WRITER_URL + "/text";

const generateEmailContent = async (
  emailWriterRequest: EmailWriterRequest,
  headers: Record<string, string | null>
): Promise<EmailWriterResponse> => {
  try {
    const response: AxiosResponse = await post(
      EMAIL_WRITER_URL,
      emailWriterRequest,
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

const getEmailContent = async (id: string): Promise<EmailWriterResponse> => {
  try {
    const response: AxiosResponse = await get(EMAIL_WRITER_URL + "/" + id);

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

export { generateEmailContent, getEmailContent };
