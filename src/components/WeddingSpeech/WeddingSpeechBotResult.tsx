import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Flex, Text, Box } from "@radix-ui/themes";
import { VscError } from "react-icons/vsc";
import { getWeddingSpeech } from "./weddingspeechdata.ts";
import Footer from "../Common/Footer.tsx";

const WeddingSpeechBot = () => {
  const { speechId } = useParams();

  const [generatedSpeech, setGeneratedSpeech] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  useEffect(() => {
    async function fetch() {
      if (speechId) {
        const response = await getWeddingSpeech(speechId);

        if (response.content) {
          setGeneratedSpeech(response.content);
        } else {
          setErrorMessage(response.statusText);
          setIsError(true);
        }
      } else {
        setErrorMessage("Not Found!");
        setIsError(true);
      }
    }

    fetch();
  }, []);

  return (
    <>
      <Box>
        <Flex
          p="5"
          className="polka"
          style={{ width: "100vw" }}
          justify="center"
        >
          <Text size="7" align="center">
            Free AI Wedding Speech Generator
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
          m="7"
          direction="column"
          justify="center"
          align="center"
          style={{
            border: "1px solid #5cd4dd",
            display: isError ? "none" : "flex",
          }}
        >
          <Text m="4" size="5">
            {generatedSpeech}
          </Text>
        </Flex>
        {generatedSpeech && (
          <Flex m="3" direction="column" justify="center" align="center">
            <Text m="4" size="3">
              You can bookmark this. This speech will be stored in our server
              for 7 days.
            </Text>
          </Flex>
        )}
      </Box>
      <Flex justify="center" align="center" className="footer">
        <Footer />
      </Flex>
    </>
  );
};

export default WeddingSpeechBot;
