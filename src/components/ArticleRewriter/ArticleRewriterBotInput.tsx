import { useState } from "react";
import { Flex, Text, Button, Box, Heading } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Header from "../Common/components/Header.tsx";
import { rewriteArticle } from "./ArticleRewriterData.ts";
import { ArticleRewriterRequest } from "./types.ts";
import { Helmet } from "react-helmet";
import Captcha from "../Common/components/Captcha.tsx";

const ArticleRewriterBotInput = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<ArticleRewriterRequest>();

  const onFormSubmit = async (data: ArticleRewriterRequest) => {
    setIsProcessing(true);

    if (!captchaToken) {
      setIsProcessing(false);
      setIsError(true);
    }
    const headers = {
      "captcha-token": captchaToken,
    };

    const response = await rewriteArticle(data, headers);

    setIsProcessing(false);
    if (response.id) {
      navigate("/article-rewriter/" + response.id);
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
        <meta
          name="description"
          content="AI-powered article rewriter for content rewriting"
        />
        <title>AI Article Rewriter</title>
        <link rel="canonical" href="http://simpleaibots.com/article-rewriter" />
      </Helmet>
      <Box className="polka">
        <Header />
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h1" size="8">
            Free AI Article Rewriter
          </Heading>
        </Flex>
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h3" size="2">
            Precisely rewrite your articles with help of AI for free
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
            <Text size="5"> Add your article below to rewrite </Text>
            <textarea
              required
              placeholder="Type or paste your article here to rewrite"
              {...register("text")}
              style={{ width: "80vw", height: "50vh" }}
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

export default ArticleRewriterBotInput;
