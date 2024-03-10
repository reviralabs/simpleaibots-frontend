import { post, get } from "../../utils/httputils.ts";
import {
  PerformanceReviewGeneratorRequest,
  PerformanceReviewGeneratorResponse,
} from "./types.ts";
import axios, { AxiosResponse } from "axios";

const PERFORMANCE_REVIEW_GENERATOR_URL =
  import.meta.env.VITE_PERFORMANCE_REVIEW_GENERATOR_URL + "/text";

const generatePerformanceReview = async (
  performanceReviewGeneratorRequest: PerformanceReviewGeneratorRequest
): Promise<PerformanceReviewGeneratorResponse> => {
  try {
    const response: AxiosResponse = await post(
      PERFORMANCE_REVIEW_GENERATOR_URL,
      performanceReviewGeneratorRequest
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

const getPerformanceReview = async (
  id: string
): Promise<PerformanceReviewGeneratorResponse> => {
  try {
    const response: AxiosResponse = await get(
      PERFORMANCE_REVIEW_GENERATOR_URL + "/" + id
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

export { generatePerformanceReview, getPerformanceReview };
