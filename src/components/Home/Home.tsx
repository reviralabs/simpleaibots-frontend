import { Flex, Box } from "@radix-ui/themes";
import Hero from "./Hero";
import Tiles from "./Tiles";
import Header from "../Common/components/Header";

const Home = () => {
  return (
    <>
      <Box className="polka">
        <Header />
        <Flex
          p="5"
          className="polka"
          style={{ width: "100vw" }}
          justify="center"
        >
          <Hero />
        </Flex>
      </Box>
      <Flex mt="5" style={{ width: "100vw" }} justify="center">
        <Tiles />
      </Flex>
    </>
  );
};

export default Home;
