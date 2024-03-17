import { post, get } from "../../utils/httputils.ts";
import {
  RealEstateDescriptionRequest,
  RealEstateDescriptionResponse,
} from "./types.ts";
import axios, { AxiosResponse } from "axios";

const REAL_ESTATE_DESCRIPTION_GENERATOR_URL =
  import.meta.env.VITE_REAL_ESTATE_DESCRIPTION_GENERATOR_URL + "/text";

const generateRealEstateDescription = async (
  realEstateDescriptionRequest: RealEstateDescriptionRequest,
  headers: Record<string, string | null>
): Promise<RealEstateDescriptionResponse> => {
  try {
    const response: AxiosResponse = await post(
      REAL_ESTATE_DESCRIPTION_GENERATOR_URL,
      realEstateDescriptionRequest,
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

const getRealEstateDescription = async (
  id: string
): Promise<RealEstateDescriptionResponse> => {
  try {
    const response: AxiosResponse = await get(
      REAL_ESTATE_DESCRIPTION_GENERATOR_URL + "/" + id
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

export { generateRealEstateDescription, getRealEstateDescription };
