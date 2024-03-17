import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Flex, Text, Box } from "@radix-ui/themes";
import { VscError } from "react-icons/vsc";
import Footer from "../Common/components/Footer.tsx";
import Header from "../Common/components/Header.tsx";
import { getRealEstateDescription } from "./RealEstateDescriptionData.ts";
import { formatResultText } from "../../utils/textutils.ts";

const RealEstateDescriptionBotResult = () => {
  const { realEstateDescriptionId } = useParams();

  const [generatedContent, setGeneratedContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  useEffect(() => {
    async function fetch() {
      if (realEstateDescriptionId) {
        const response = await getRealEstateDescription(
          realEstateDescriptionId
        );

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
        <Box className="polka">
          <Header />
          <Flex p="1" style={{ width: "100vw" }} justify="center">
            <Text size="7" align="center">
              Free AI Real Estate Description Generator
            </Text>
          </Flex>
        </Box>
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
      </Box>
      <Flex justify="center" align="center" className="footer">
        <Footer />
      </Flex>
    </>
  );
};

export default RealEstateDescriptionBotResult;
