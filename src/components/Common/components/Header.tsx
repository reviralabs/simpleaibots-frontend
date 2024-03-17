import { Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import logoBlack from "../../../images/logo-color.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center">
      <Flex
        m="5"
        align="center"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <img
          src={logoBlack}
          alt="SimpleAIBots"
          style={{
            objectFit: "cover",
            width: "20vw",
            height: "8vh",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
