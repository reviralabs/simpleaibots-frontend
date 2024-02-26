export type EssayWriterRequest = {
  title: string;
  numberOfParagraphs: number;
  authorPersona: string;
  emotion: string;
};

export type EssayWriterResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
