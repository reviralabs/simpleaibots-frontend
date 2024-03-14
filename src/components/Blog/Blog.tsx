import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Flex, Text, Box } from "@radix-ui/themes";
import { VscError } from "react-icons/vsc";
import Footer from "../Common/components/Footer.tsx";
import Header from "../Common/components/Header.tsx";
import { formatResultText } from "../../utils/textutils.ts";
import { getBlog } from "./BlogData.ts";
import { Helmet } from "react-helmet";
import { blogNames, blogDescriptions } from "./metadata.ts";

const Blog = () => {
  const { blogName } = useParams();

  const [content, setContent] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  useEffect(() => {
    async function fetch() {
      if (blogName) {
        const response = await getBlog(blogName);

        if (response.content) {
          setContent(response.content);
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
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={blogName && blogDescriptions[blogName]}
        />
        <title>{blogName && blogNames[blogName]}</title>
        <link
          rel="canonical"
          href="http://simpleaibots.com/content-shortener"
        />
      </Helmet>
      <Box>
        <Box className="polka">
          <Header />
          <Flex p="1" style={{ width: "100vw" }} justify="center">
            <Text size="7" align="center">
              Free AI Email Writer
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
            {formatResultText(content)}
          </Text>
        </Flex>
      </Box>
      <Flex justify="center" align="center" className="footer">
        <Footer />
      </Flex>
    </>
  );
};

export default Blog;
