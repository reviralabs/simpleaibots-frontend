import React from "react";
import { Text, Strong, Card, Box, Flex, Badge } from "@radix-ui/themes";

interface TileType {
  title: string;
  description: string;
  route: string;
  cost: string;
}

const Tile: React.FC<{ tile: TileType }> = ({ tile }) => {
  return (
    <Card
      asChild
      style={{ height: "20vh", border: "1px solid #5cd4dd" }}
      onClick={() => console.log("heyyyy")}
      m="3"
    >
      <a href={tile.route}>
        <Flex justify="between">
          <Box m="2">
            <Text as="div" size="3" weight="bold" color="crimson">
              <Strong>{tile.title}</Strong>
            </Text>
          </Box>
          <Badge m="2" size="1" color="green">
            {tile.cost}
          </Badge>
        </Flex>
        <Box m="2">
          <Text as="div" color="gray" size="3">
            {tile.description}
          </Text>
        </Box>
      </a>
    </Card>
  );
};

export default Tile;
