import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Flex, Text, Box } from "@radix-ui/themes";
import { get } from "../../utils/httputils.ts";
import Footer from "../Common/Footer.tsx";

const WeddingSpeechBot = () => {
  const { speechId } = useParams();

  const [generatedSpeech, setGeneratedSpeech] = useState("");

  useEffect(() => {
    async function fetch() {
      const response = await get("http://localhost:8787/text/" + speechId);
      if (response) {
        setGeneratedSpeech(response.content);
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
          m="7"
          direction="column"
          justify="center"
          align="center"
          style={{ border: "1px solid #5cd4dd" }}
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
