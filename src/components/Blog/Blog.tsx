import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Flex, Text, Box, Heading, Container, Strong } from "@radix-ui/themes";
import { VscError } from "react-icons/vsc";
import Footer from "../Common/components/Footer.tsx";
import Header from "../Common/components/Header.tsx";
import { getBlog } from "./BlogData.ts";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const { blogName } = useParams();

  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [href, setHref] = useState("");
  const [toolLink, setToolLink] = useState("");
  const [toolLinkText, setToolLinkText] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  useEffect(() => {
    async function fetch() {
      if (blogName) {
        const response = await getBlog(blogName);

        if (response.content) {
          setContent(response.content);
          setTitle(response.title);
          setToolLink(response.toolLink);
          setToolLinkText(response.toolLinktext);
          setHref("http://simpleaibots.com/blogs/" + blogName);
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
        <meta name="description" content={blogName && title} />
        <title>{blogName && title}</title>
        <link rel="canonical" href={href} />
      </Helmet>
      <Box>
        <Box className="polka">
          <Header />
          <Flex p="1" style={{ width: "100vw" }} justify="center">
            <Heading as="h1" size="8">
              {title}
            </Heading>
          </Flex>
        </Box>
        <Flex justify="center" align="center" mt="5">
          <Text
            size="3"
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/" + toolLink)}
          >
            <Strong className="herotext"> {toolLinkText} </Strong>
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
          <Container>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Container>
        </Flex>
      </Box>
      <Flex justify="center" align="center" className="footer">
        <Footer />
      </Flex>
    </>
  );
};

export default Blog;
