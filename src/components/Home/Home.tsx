import { Flex, Box } from "@radix-ui/themes";
import Hero from "./Hero";
import Tiles from "./Tiles";
import Header from "../Common/components/Header";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Simple AI tools to boost productivity"
        />
        <title>Simple AI Bots</title>
        <link rel="canonical" href="http://simpleaibots.com" />
      </Helmet>
      <Box className="polka">
        <Header />
        <Flex p="5" style={{ width: "100vw" }} justify="center">
          <Hero />
        </Flex>
      </Box>
      <Flex mt="5" ml="5" mr="5" justify="center">
        <Tiles />
      </Flex>
    </>
  );
};

export default Home;
