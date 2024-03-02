export type ContentShortenerRequest = {
  text: string;
};

export type ContentShortenerResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
