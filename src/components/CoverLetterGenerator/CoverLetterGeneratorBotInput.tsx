import { useState } from "react";
import { Flex, Text, Button, Box, Heading } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Header from "../Common/components/Header.tsx";
import { generateCoverLetter } from "./CoverLetterGeneratorData.ts";
import { CoverLetterGeneratorRequest } from "./types.ts";
import { Helmet } from "react-helmet";
import Captcha from "../Common/components/Captcha.tsx";

type formErrors = {
  [key: string]: string;
};

const CoverLetterGeneratorBotInput = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<formErrors>({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { register, handleSubmit, reset } =
    useForm<CoverLetterGeneratorRequest>();

  const onFormSubmit = async (data: CoverLetterGeneratorRequest) => {
    setIsProcessing(true);
    setFormErrors({});

    if (!captchaToken) {
      setIsProcessing(false);
      setIsError(true);
    }
    const headers = {
      "captcha-token": captchaToken,
    };

    const response = await generateCoverLetter(data, headers);

    setIsProcessing(false);
    if (response.id) {
      navigate("/cover-letter-generator/" + response.id);
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
        <meta name="description" content="AI-powered cover letter generator" />
        <title>AI Cover Letter Generator</title>
        <link
          rel="canonical"
          href="http://simpleaibots.com/cover-letter-generator"
        />
      </Helmet>
      <Box className="polka">
        <Header />
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h1" size="8">
            Free AI Cover Letter Generator
          </Heading>
        </Flex>
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h3" size="2">
            Generate cover letter to precisley match job description and your
            resume
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
            <Text size="5"> Job Title </Text>
            <input
              type="text"
              required
              placeholder="Light Bulb Changer"
              {...register("jobTitle", {
                validate: (val) => {
                  if (val.length > 40) {
                    setFormErrors((prevPersonInfo) => ({
                      ...prevPersonInfo,
                      jobTitle: "Number of characters must not exceed 40",
                    }));
                    return false;
                  }
                  return true;
                },
              })}
              style={{ width: "80vw", height: "6vh" }}
            />
            {formErrors.jobTitle && (
              <Text color="red" size="3">
                {formErrors.jobTitle}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">Job Description</Text>
            <textarea
              required
              placeholder="Paste job description for which you are applying"
              {...register("jobDescription")}
              style={{ width: "80vw", height: "20vh" }}
            />
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5"> Resume </Text>
            <textarea
              placeholder="[optional] Type or paste your content here. &#10;
              Example: &#10;
              - 3 years of experience in Python &#10;
              - Have demonstrated history of leadership skills &#10;
              - Good team player"
              {...register("resume")}
              style={{ width: "80vw", height: "20vh" }}
            />
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Captcha setToken={setCaptchaToken} />
          </Flex>
          <Flex m="5" direction="column" justify="center">
            {captchaToken && <Button size="4">Generate</Button>}
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default CoverLetterGeneratorBotInput;
