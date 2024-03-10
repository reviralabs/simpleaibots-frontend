import { useState } from "react";
import { Flex, Text, Button, Box } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Header from "../Common/components/Header.tsx";
import { generatePerformanceReview } from "./PerformanceReviewGeneratorData.ts";
import { PerformanceReviewGeneratorRequest } from "./types.ts";

type formErrors = {
  [key: string]: string;
};

const PerformanceReviewGeneratorInput = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<formErrors>({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  const { register, handleSubmit, reset } =
    useForm<PerformanceReviewGeneratorRequest>();

  const onFormSubmit = async (data: PerformanceReviewGeneratorRequest) => {
    setIsProcessing(true);
    setFormErrors({});

    const response = await generatePerformanceReview(data);

    setIsProcessing(false);
    if (response.id) {
      navigate("/performance-review-generator/" + response.id);
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
            Free AI Performance Review Generator
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
            <Text size="7"> Employee Name </Text>
            <input
              type="text"
              required
              placeholder="Phil Dunphy"
              {...register("employeeName", {
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
            {formErrors.employeeName && (
              <Text color="red" size="3">
                {formErrors.employeeName}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="7"> Job Title </Text>
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
            <Text size="7">Key Achievements</Text>
            <textarea
              required
              placeholder="Type or paste your content here. &#10;
              Example: &#10;
              - 3 years of experience in Python &#10;
              - Have demonstrated history of leadership skills &#10;
              - Good team player"
              {...register("keyAchievements")}
              style={{ width: "80vw", height: "20vh" }}
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

export default PerformanceReviewGeneratorInput;
