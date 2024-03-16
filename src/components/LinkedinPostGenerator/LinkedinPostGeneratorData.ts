import { post, get } from "../../utils/httputils.ts";
import {
  LinkedinPostGeneratorRequest,
  LinkedinPostGeneratorResponse,
} from "./types.ts";
import axios, { AxiosResponse } from "axios";

const LINKEDIN_POST_GENERATOR_URL =
  import.meta.env.VITE_LINKEDIN_POST_GENERATOR_URL + "/text";

const generateLinkedinPost = async (
  linkedinPostGeneratorRequest: LinkedinPostGeneratorRequest,
  headers: Record<string, string | null>
): Promise<LinkedinPostGeneratorResponse> => {
  try {
    const response: AxiosResponse = await post(
      LINKEDIN_POST_GENERATOR_URL,
      linkedinPostGeneratorRequest,
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

const getLinkedinPost = async (
  id: string
): Promise<LinkedinPostGeneratorResponse> => {
  try {
    const response: AxiosResponse = await get(
      LINKEDIN_POST_GENERATOR_URL + "/" + id
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

export { generateLinkedinPost, getLinkedinPost };
