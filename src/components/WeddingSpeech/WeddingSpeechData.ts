import { post, get } from "../../utils/httputils.ts";
import { WeddingSpeechRequest, WeddingSpeechResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const WEDDING_SPEECH_URL = import.meta.env.VITE_WEDDING_SPEECH_URL + "/text";

const generateWeddingSpeech = async (
  weddingSpeechInput: WeddingSpeechRequest,
  headers: Record<string, string | null>
): Promise<WeddingSpeechResponse> => {
  try {
    const response: AxiosResponse = await post(
      WEDDING_SPEECH_URL,
      weddingSpeechInput,
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

const getWeddingSpeech = async (id: string): Promise<WeddingSpeechResponse> => {
  try {
    const response: AxiosResponse = await get(WEDDING_SPEECH_URL + "/" + id);

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

export { generateWeddingSpeech, getWeddingSpeech };
