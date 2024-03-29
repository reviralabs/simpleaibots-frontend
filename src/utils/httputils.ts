import axios, { AxiosResponse } from "axios";

const post = async (
  url: string,
  payload: Record<string, string | string[] | number | number[] | boolean>,
  headers?: Record<string, string | null>
): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(url, payload, {
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("post " + url + " request failed with error");
    console.error(error);
    throw error;
  }
};

const get = async (url: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(url);
    return response;
  } catch (error) {
    console.error("get " + url + " request failed with error");
    console.error(error);
    throw error;
  }
};

export { post, get };
