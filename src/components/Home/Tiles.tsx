import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Grid } from "@radix-ui/themes";
import Tile from "./Tile";

interface TileType {
  title: string;
  description: string;
  route: string;
  cost: string;
}

const Tiles = () => {
  const [tiles, setTiles] = useState<TileType[]>([]);

  useEffect(() => {
    try {
      setTiles([
        {
          title: "Wedding Speech Generator",
          description:
            "Generate your own wedding speech using AI and impress everyone",
          route: "/wedding-speech-generator",
          cost: "Free",
        },
        {
          title: "Cover Letter Generator",
          description:
            "Generate your cover letter using AI based on the job profile",
          route: "/cover-letter-generator",
          cost: "Free",
        },
        {
          title: "Article Re-writter",
          description: "Re-write any article using AI",
          route: "/article-rewritter",
          cost: "Free",
        },
        {
          title: "Content Shortener",
          description: "Shorten Content using AI",
          route: "/content-shortener",
          cost: "Free",
        },
        {
          title: "Grammar Fixer",
          description: "Fix paragraph grammar using AI",
          route: "/grammar-fixer",
          cost: "Free",
        },
        {
          title: "Essay Writer",
          description: "Write an essay using AI",
          route: "/essay-writer",
          cost: "Free",
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <Grid columns={isMobile ? "1" : "4"}>
      {tiles.map((tile) => (
        <Tile tile={tile} />
      ))}
    </Grid>
  );
};

export default Tiles;
