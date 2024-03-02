export type CoverLetterGeneratorRequest = {
  jobTitle: string;
  jobDescription: string;
  resume: string;
};

export type CoverLetterGeneratorResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
