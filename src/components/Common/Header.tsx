import { Flex, Text, Box, Strong } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import cutebot from "../../images/cutebot.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="between">
      <Flex m="3" align="center">
        <img
          src={cutebot}
          alt="SimpleAIBots"
          style={{
            objectFit: "cover",
            width: "3vw",
            height: "6vh",
          }}
        />
        <Box m="3">
          <Text size="4">
            <Strong>Simple AI Bots</Strong>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
