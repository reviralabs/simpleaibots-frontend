export type GrammarFixerRequest = {
  text: string;
};

export type GrammarFixerResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
