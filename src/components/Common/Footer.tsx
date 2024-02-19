import { Text, Box, Strong } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Text
        size="3"
        align="center"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Explore our other
        <Strong className="herotext"> Free AI Tools</Strong>
      </Text>
    </Box>
  );
};

export default Footer;
