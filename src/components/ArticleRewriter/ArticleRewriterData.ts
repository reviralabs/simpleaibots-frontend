import { post, get } from "../../utils/httputils.ts";
import { ArticleRewriterRequest, ArticleRewriterResponse } from "./types.ts";
import axios, { AxiosResponse } from "axios";

const ARTICLE_REWRITER_URL =
  import.meta.env.VITE_ARTICLE_REWRITER_URL + "/text";

const rewriteArticle = async (
  articleRewriterRequest: ArticleRewriterRequest,
  headers: Record<string, string | null>
): Promise<ArticleRewriterResponse> => {
  try {
    const response: AxiosResponse = await post(
      ARTICLE_REWRITER_URL,
      articleRewriterRequest,
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

const getRewrittenArticle = async (
  id: string
): Promise<ArticleRewriterResponse> => {
  try {
    const response: AxiosResponse = await get(ARTICLE_REWRITER_URL + "/" + id);

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

export { rewriteArticle, getRewrittenArticle };
