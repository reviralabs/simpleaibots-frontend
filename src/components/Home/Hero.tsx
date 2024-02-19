import { Text, Box, Strong } from "@radix-ui/themes";

const Hero = () => {
  return (
    <Box p="7">
      <Text size="8" align="center">
        <Strong className="herotext">Simple</Strong> and{" "}
        <Strong className="herotext">Free</Strong> AI Tools that make your life
        easier
      </Text>
    </Box>
  );
};

export default Hero;
