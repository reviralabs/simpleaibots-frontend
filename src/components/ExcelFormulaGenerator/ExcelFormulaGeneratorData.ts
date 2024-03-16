import { post, get } from "../../utils/httputils.ts";
import {
  ExcelFormulaGeneratorRequest,
  ExcelFormulaGeneratorResponse,
} from "./types.ts";
import axios, { AxiosResponse } from "axios";

const EXCEL_FORMULA_GENERATOR_URL =
  import.meta.env.VITE_EXCEL_FORMULA_GENERATOR_URL + "/text";

const excelFormulaGeneratorContent = async (
  excelFormulaGeneratorRequest: ExcelFormulaGeneratorRequest,
  headers: Record<string, string | null>
): Promise<ExcelFormulaGeneratorResponse> => {
  try {
    const response: AxiosResponse = await post(
      EXCEL_FORMULA_GENERATOR_URL,
      excelFormulaGeneratorRequest,
      headers
    );
    if (response && response.status && response.status == 200) {
      return {
        id: response.data.id,
        content: response.data.content,
        statusCode: response.status,
        statusText: response.statusText,
      };
    }

    return genericErrorRepsonse();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        id: "",
        content: "",
        statusCode: error.response.status,
        statusText: error.response.statusText,
      };
    }

    return genericErrorRepsonse();
  }
};

const getExcelFormula = async (
  id: string
): Promise<ExcelFormulaGeneratorResponse> => {
  try {
    const response: AxiosResponse = await get(
      EXCEL_FORMULA_GENERATOR_URL + "/" + id
    );

    if (response && response.status && response.status == 200) {
      return {
        id: response.data.id,
        content: response.data.content,
        statusCode: response.status,
        statusText: response.statusText,
      };
    }

    return genericErrorRepsonse();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        id: "",
        content: "",
        statusCode: error.response.status,
        statusText: error.response.statusText,
      };
    }

    return genericErrorRepsonse();
  }
};

const genericErrorRepsonse = () => {
  return {
    id: "",
    content: "",
    statusCode: 500,
    statusText: "generic error",
  };
};

export { excelFormulaGeneratorContent, getExcelFormula };
