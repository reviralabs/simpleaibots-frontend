import { useState } from "react";
import { Flex, Text, Button, Box } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Header from "../Common/Header";
import { generateShortContent } from "./ContentShortenerData.ts";
import { ContentShortenerRequest } from "./types.ts";

const ContentShortenerBotInput = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  const { register, handleSubmit, reset } = useForm<ContentShortenerRequest>();

  const onFormSubmit = async (data: ContentShortenerRequest) => {
    setIsProcessing(true);

    const response = await generateShortContent(data);

    setIsProcessing(false);
    if (response.id) {
      navigate("/content-shortener/" + response.id);
    } else {
      setErrorMessage(response.statusText);
      setIsError(true);
    }

    reset();
  };

  return (
    <>
      <Box className="polka">
        <Header />
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Text size="7" align="center">
            Free AI Content Shortener
          </Text>
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
            <Text size="7"> Add your content to shorten it </Text>
            <textarea
              required
              placeholder="Type or paste your content here"
              {...register("text")}
              style={{ width: "80vw", height: "50vh" }}
            />
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Button size="4">Shorten</Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default ContentShortenerBotInput;
