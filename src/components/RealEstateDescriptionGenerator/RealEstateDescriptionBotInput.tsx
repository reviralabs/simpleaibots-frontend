import { useState } from "react";
import { Flex, Text, Button, Box, Heading } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import Header from "../Common/components/Header.tsx";
import { generateRealEstateDescription } from "./RealEstateDescriptionData.ts";
import { RealEstateDescriptionRequest } from "./types.ts";
import { Helmet } from "react-helmet";
import Captcha from "../Common/components/Captcha.tsx";

type formErrors = {
  [key: string]: string;
};

const RealEstateDescriptionBotInput = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<formErrors>({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { register, handleSubmit, reset } =
    useForm<RealEstateDescriptionRequest>();

  const onFormSubmit = async (data: RealEstateDescriptionRequest) => {
    setIsProcessing(true);
    setFormErrors({});

    if (!captchaToken) {
      setIsProcessing(false);
      setIsError(true);
    }
    const headers = {
      "captcha-token": captchaToken,
    };

    const response = await generateRealEstateDescription(data, headers);

    setIsProcessing(false);
    if (response.id) {
      navigate("/realestate-description-generator/" + response.id);
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
          content="AI-powered Real Estate Description Generator"
        />
        <title>AI Real Estate Description Generator</title>
        <link
          rel="canonical"
          href="http://simpleaibots.com/real-estate-description-generator"
        />
      </Helmet>
      <Box className="polka">
        <Header />
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h1" size="8">
            Free AI Real Estate Description Generator
          </Heading>
        </Flex>
        <Flex p="1" style={{ width: "100vw" }} justify="center">
          <Heading as="h3" size="2">
            Generate real estate listing description with ease.
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
            <Text size="5"> Property Address </Text>
            <input
              type="text"
              required
              placeholder="10 Downing Street"
              {...register("propertyAddress", {
                validate: (val) => {
                  if (val.length > 400) {
                    setFormErrors((prevPersonInfo) => ({
                      ...prevPersonInfo,
                      propertyAddress:
                        "Number of characters must not exceed 400",
                    }));
                    return false;
                  }
                  return true;
                },
              })}
              style={{ width: "80vw", height: "6vh" }}
            />
            {formErrors.propertyAddress && (
              <Text color="red" size="3">
                {formErrors.propertyAddress}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">Property Type</Text>
            <input
              type="text"
              required
              placeholder="Town House"
              {...register("propertyType", {
                validate: (val) => {
                  if (val.length > 50) {
                    setFormErrors((prevPersonInfo) => ({
                      ...prevPersonInfo,
                      propertyType: "Number of characters must not exceed 50",
                    }));
                    return false;
                  }
                  return true;
                },
              })}
              style={{ width: "80vw", height: "6vh" }}
            />
            {formErrors.propertyType && (
              <Text color="red" size="3">
                {formErrors.propertyType}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">Stay Type</Text>
            <select
              {...register("propertyStayType")}
              style={{ width: "80vw", height: "8vh" }}
            >
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
            </select>
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">Room count</Text>
            <input
              type="text"
              required
              placeholder="3"
              {...register("propertyRoomCount", {
                validate: (val) => {
                  if (isNaN(Number(val))) {
                    setFormErrors((prevPersonInfo) => ({
                      ...prevPersonInfo,
                      propertyRoomCount: "Can only be a number",
                    }));
                    return false;
                  }
                  return true;
                },
              })}
              style={{ width: "80vw", height: "6vh" }}
            />
            {formErrors.propertyRoomCount && (
              <Text color="red" size="3">
                {formErrors.propertyRoomCount}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">Bathroom count</Text>
            <input
              type="text"
              required
              placeholder="3"
              {...register("propertyBathroomCount", {
                validate: (val) => {
                  if (isNaN(Number(val))) {
                    setFormErrors((prevPersonInfo) => ({
                      ...prevPersonInfo,
                      propertyBathroomCount: "Can only be a number",
                    }));
                    return false;
                  }
                  return true;
                },
              })}
              style={{ width: "80vw", height: "6vh" }}
            />
            {formErrors.propertyRoomCount && (
              <Text color="red" size="3">
                {formErrors.propertyRoomCount}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">Size in SqFt</Text>
            <input
              type="text"
              required
              placeholder="3"
              {...register("propertySquareFeet", {
                validate: (val) => {
                  if (isNaN(Number(val))) {
                    setFormErrors((prevPersonInfo) => ({
                      ...prevPersonInfo,
                      propertySquareFeet: "Can only be a number",
                    }));
                    return false;
                  }
                  return true;
                },
              })}
              style={{ width: "80vw", height: "6vh" }}
            />
            {formErrors.propertySquareFeet && (
              <Text color="red" size="3">
                {formErrors.propertySquareFeet}
              </Text>
            )}
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5">Has Parking?</Text>
            <select
              {...register("propertyHasParking")}
              style={{ width: "80vw", height: "8vh" }}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="5"> Other Highlights </Text>
            <textarea
              placeholder="Type or paste your content here. &#10;
              Example: &#10;
              - Has a beautiful garden &#10;
              - On a quiet road &#10;
              - Next to a lake &#10;
              - Has sunset view "
              {...register("propertyHighlights")}
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

export default RealEstateDescriptionBotInput;
