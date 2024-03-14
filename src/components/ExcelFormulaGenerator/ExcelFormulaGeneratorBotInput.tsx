import { useState } from "react";
import { Flex, Text, Button, Box, Heading } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Header from "../Common/components/Header.tsx";
import { excelFormulaGeneratorContent } from "./ExcelFormulaGeneratorData.ts";
import { ExcelFormulaGeneratorRequest } from "./types.ts";
import { Helmet } from "react-helmet";

const ExcelFormulaGeneratorBotInput = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  const { register, handleSubmit, reset } =
    useForm<ExcelFormulaGeneratorRequest>();

  const onFormSubmit = async (data: ExcelFormulaGeneratorRequest) => {
    setIsProcessing(true);

    const response = await excelFormulaGeneratorContent(data);

    setIsProcessing(false);
    if (response.id) {
      navigate("/excel-formula-generator/" + response.id);
    } else {
      setErrorMessage(response.statusText);
      setIsError(true);
    }

    reset();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="AI-powered excel formula generator" />
        <title>AI Excel Formula Generator</title>
        <link
          rel="canonical"
          href="http://simpleaibots.com/excel-formula-generator"
        />
      </Helmet>
      <Box className="polka">
        <Header />
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h1" size="8">
            Free AI Excel Formula Generator
          </Heading>
        </Flex>
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h3" size="2">
            Generate spreadsheet formulas using text description
          </Heading>
        </Flex>
      </Box>
      <Flex
        m="3"
        direction="column"
        justify="center"
        align="center"
        style={{ display: isProcessing ? "flex" : "none" }}
      >
        <AiOutlineLoading3Quarters
          className="rotate-center"
          style={{ width: "10vw", height: "10vh" }}
        />
        <Text mt="5" size="5">
          AI is doing its magic... Wait for few seconds...
        </Text>
      </Flex>
      <Flex
        m="3"
        direction="column"
        justify="center"
        align="center"
        style={{ display: isError ? "flex" : "none" }}
      >
        <VscError style={{ width: "10vw", height: "10vh" }} />
        <Text mt="5" size="5">
          {errorMessage}
        </Text>
      </Flex>
      <Flex
        m="2"
        direction="column"
        align="center"
        justify="center"
        style={{ display: isProcessing || isError ? "none" : "flex" }}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">
              Type your text here to convert it into a spreadsheet formula
            </Text>
            <textarea
              required
              placeholder="E.g. Sum column A when column B is last day of this month and column C equals the word 'sales'"
              {...register("text")}
              style={{ width: "80vw", height: "50vh" }}
            />
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Button size="4">Generate</Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default ExcelFormulaGeneratorBotInput;
