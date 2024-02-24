import { post, get } from "../../utils/httputils.ts";
import { WeddingSpeechRequest, WeddingSpeechResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const WeddingSpeechUrl = "http://localhost:8787/text";

const generateWeddingSpeech = async (
  weddingSpeechInput: WeddingSpeechRequest
): Promise<WeddingSpeechResponse> => {
  try {
    const response: AxiosResponse = await post(
      WeddingSpeechUrl,
      weddingSpeechInput
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
    const response: AxiosResponse = await get(WeddingSpeechUrl + "/" + id);

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
