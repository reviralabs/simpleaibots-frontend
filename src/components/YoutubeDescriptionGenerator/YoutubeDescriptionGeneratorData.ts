import { post, get } from "../../utils/httputils.ts";
import {
  YoutubeDescriptionGeneratorRequest,
  YoutubeDescriptionGeneratorResponse,
} from "./types.ts";
import axios, { AxiosResponse } from "axios";

const YOUTUBE_DESCRIPTION_GENERATOR_URL =
  import.meta.env.VITE_YOUTUBE_DESCRIPTION_GENERATOR_URL + "/text";

const generateYoutubeDescription = async (
  youtubeDescriptionGeneratorRequest: YoutubeDescriptionGeneratorRequest
): Promise<YoutubeDescriptionGeneratorResponse> => {
  try {
    const response: AxiosResponse = await post(
      YOUTUBE_DESCRIPTION_GENERATOR_URL,
      youtubeDescriptionGeneratorRequest
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

const getYoutubeDescription = async (
  id: string
): Promise<YoutubeDescriptionGeneratorResponse> => {
  try {
    const response: AxiosResponse = await get(
      YOUTUBE_DESCRIPTION_GENERATOR_URL + "/" + id
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

const genericErrorRepsonse = () => {
  return {
    id: "",
    content: "",
    statusCode: 500,
    statusText: "generic error",
  };
};

export { generateYoutubeDescription, getYoutubeDescription };
