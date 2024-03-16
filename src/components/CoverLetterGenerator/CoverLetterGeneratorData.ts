import { post, get } from "../../utils/httputils.ts";
import {
  CoverLetterGeneratorRequest,
  CoverLetterGeneratorResponse,
} from "./types.ts";
import axios, { AxiosResponse } from "axios";

const COVER_LETTER_GENERATOR_URL =
  import.meta.env.VITE_COVER_LETTER_GENERATOR_URL + "/text";

const generateCoverLetter = async (
  coverLetterGeneratorRequest: CoverLetterGeneratorRequest,
  headers: Record<string, string | null>
): Promise<CoverLetterGeneratorResponse> => {
  try {
    const response: AxiosResponse = await post(
      COVER_LETTER_GENERATOR_URL,
      coverLetterGeneratorRequest,
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

const getCoverLetter = async (
  id: string
): Promise<CoverLetterGeneratorResponse> => {
  try {
    const response: AxiosResponse = await get(
      COVER_LETTER_GENERATOR_URL + "/" + id
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

export { generateCoverLetter, getCoverLetter };
