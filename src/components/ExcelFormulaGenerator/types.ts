export type ExcelFormulaGeneratorRequest = {
  text: string;
};

export type ExcelFormulaGeneratorResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
