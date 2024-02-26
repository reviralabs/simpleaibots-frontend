import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Flex, Text, Box } from "@radix-ui/themes";
import { VscError } from "react-icons/vsc";
import { getGrammarFixerContent } from "./GrammarFixerData.ts";
import Footer from "../Common/Footer.tsx";
import { formatResultText } from "../../utils/textutils.ts";

const EssayWriterBotResult = () => {
  const { grammarFixerContentId } = useParams();

  const [generatedContent, setGeneratedContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  useEffect(() => {
    async function fetch() {
      if (grammarFixerContentId) {
        const response = await getGrammarFixerContent(grammarFixerContentId);

        if (response.content) {
          setGeneratedContent(response.content);
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
            Free AI Grammar Fixer
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
          <Text m="4" size="5" className="display-linebreak">
            {formatResultText(generatedContent)}
          </Text>
        </Flex>
        {generatedContent && (
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

export default EssayWriterBotResult;
