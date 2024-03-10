export type YoutubeDescriptionGeneratorRequest = {
  text: string;
};

export type YoutubeDescriptionGeneratorResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
