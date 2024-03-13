import { useState } from "react";
import { Flex, Text, Button, Box, Heading } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Header from "../Common/components/Header.tsx";
import { generateEssay } from "./EssayWriterData.ts";
import { EssayWriterRequest } from "./types.ts";

type formErrors = {
  [key: string]: string;
};

const EssayWriterBotInput = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<formErrors>({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  const { register, handleSubmit, reset } = useForm<EssayWriterRequest>();

  const onFormSubmit = async (data: EssayWriterRequest) => {
    setIsProcessing(true);
    setFormErrors({});

    const response = await generateEssay(data);

    setIsProcessing(false);
    if (response.id) {
      navigate("/essay-writer/" + response.id);
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
          <Heading as="h1" size="8">
            Free AI Essay Writer
          </Heading>
        </Flex>
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h3" size="2">
            Write essay on any topic with customizable emotions for free
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
            <Text size="5"> What is the title of the essay? </Text>
            <input
              type="text"
              required
              placeholder="example: Why positive thinking is a must have skill for every person"
              {...register("title")}
              style={{ width: "80vw", height: "6vh" }}
            />
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5"> Number of paragraphs </Text>
            <input
              type="text"
              required
              placeholder="3"
              {...register("numberOfParagraphs", {
                validate: (val) => {
                  if (val > 10) {
                    setFormErrors((prevPersonInfo) => ({
                      ...prevPersonInfo,
                      numberOfParagraphs:
                        "Number of paragraphs must not exceed 10",
                    }));
                    return false;
                  }
                  return true;
                },
              })}
              style={{ width: "80vw", height: "6vh" }}
            />
            {formErrors.numberOfParagraphs && (
              <Text color="red" size="3">
                {formErrors.numberOfParagraphs}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5"> Who is the author? </Text>
            <select
              {...register("authorPersona")}
              style={{ width: "80vw", height: "8vh" }}
            >
              <option value="school">School Student</option>
              <option value="college">College Student</option>
              <option value="professional">Professional</option>
            </select>
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">
              What emotion do you want to express in your speech?
            </Text>
            <select
              {...register("emotion")}
              style={{ width: "80vw", height: "8vh" }}
            >
              <option value="humor">Humor</option>
              <option value="emotional">Emotional</option>
              <option value="inspirational">Inspirational</option>
              <option value="hope">Hope</option>
              <option value="gratitude">Gratitude</option>
            </select>
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Button size="4">Generate</Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default EssayWriterBotInput;
