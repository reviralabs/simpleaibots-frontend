import { post, get } from "../../utils/httputils.ts";
import { GrammarFixerRequest, GrammarFixerResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const GRAMMAR_FIXER_URL = import.meta.env.VITE_GRAMMAR_FIXER_URL + "/text";

const generateGrammarFixerContent = async (
  grammarFixerRequest: GrammarFixerRequest,
  headers: Record<string, string | null>
): Promise<GrammarFixerResponse> => {
  try {
    const response: AxiosResponse = await post(
      GRAMMAR_FIXER_URL,
      grammarFixerRequest,
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

const getGrammarFixerContent = async (
  id: string
): Promise<GrammarFixerResponse> => {
  try {
    const response: AxiosResponse = await get(GRAMMAR_FIXER_URL + "/" + id);

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

export { generateGrammarFixerContent, getGrammarFixerContent };
