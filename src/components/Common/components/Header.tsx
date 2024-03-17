import { Flex, Box } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import logoBlack from "../../../images/logo-color.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center">
      <Flex
        m="3"
        align="center"
        justify="center"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <img
          src={logoBlack}
          alt="SimpleAIBots"
          height="auto"
          style={{
            width: "20%",
            height: "auto",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
