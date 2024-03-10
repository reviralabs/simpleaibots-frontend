export type LinkedinPostGeneratorRequest = {
  text: string;
};

export type LinkedinPostGeneratorResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
