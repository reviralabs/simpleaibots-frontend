export type ArticleRewriterRequest = {
  text: string;
};

export type ArticleRewriterResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
