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
          title: "Excel Formula Generator",
          description: "Generate excel formula using text description",
          route: "/excel-formula-generator",
          cost: "Free",
        },
        {
          title: "Cover Letter Generator",
          description:
            "Generate cover letter using AI based on the job profile",
          route: "/cover-letter-generator",
          cost: "Free",
        },
        {
          title: "Article Re-writer",
          description: "Re-write any article using AI",
          route: "/article-rewriter",
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
        {
          title: "E-mail Writer",
          description: "Write emails using AI",
          route: "/email-writer",
          cost: "Free",
        },
        {
          title: "Youtube Description Generator",
          description:
            "Generate SEO friendly description for your youtube videos with AI",
          route: "/youtube-description-generator",
          cost: "Free",
        },
        {
          title: "Linkedin Post Generator",
          description: "Generate Linkedin post for a specific topic with AI",
          route: "/linkedin-post-generator",
          cost: "Free",
        },
        {
          title: "Real Estate Description Generator",
          description: "Generate property description with AI",
          route: "/realestate-description-generator",
          cost: "Free",
        },
        {
          title: "Performance Review Generator",
          description: "Write clear and effective performace review with AI",
          route: "/performance-review-generator",
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
