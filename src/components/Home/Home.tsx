import Hero from "./Hero";
import Tiles from "./Tiles";
import { Flex } from "@radix-ui/themes";

const Home = () => {
  return (
    <>
      <Flex p="9" className="polka" style={{ width: "100vw" }} justify="center">
        <Hero />
      </Flex>
      <Flex mt="5" style={{ width: "100vw" }} justify="center">
        <Tiles />
      </Flex>
    </>
  );
};

export default Home;
