export type EmailWriterRequest = {
  text: string;
};

export type EmailWriterResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
