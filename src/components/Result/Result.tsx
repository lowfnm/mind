import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../../context/AppContext";
import { index } from "../../AlgoliaClient";

const ResultBlock: React.FC = () => {
  const [algoliaResults, setAlgoliaResults] = useState<any[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { selectedChoices } = useAppContext();

  const facetFilters = Object.entries(selectedChoices).flatMap(
    ([key, values]) => values.map((value) => `relevantTo:${key}:${value}`)
  );

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await Promise.all(
          facetFilters.map((filter) =>
            index.search("", { facetFilters: [filter] })
          )
        );

        const mergedHits = Array.from(
          new Map(
            results
              .flatMap((result) => result.hits)
              .map((hit) => [hit.objectID, hit])
          ).values()
        );

        setAlgoliaResults(mergedHits);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsloading(false);
      }
    };

    fetchResults();
  }, [facetFilters]);

  if (isLoading) return null;

  return (
    <div>
      <h1>Algolia Test Results</h1>
      {algoliaResults.length > 0 ? (
        algoliaResults.map((result: any, index) => (
          <Card key={index} style={{ marginBottom: "20px" }}>
            <CardMedia
              component="img"
              alt={result.title}
              height="140"
              image={result.imageUrl}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {result.title}
              </Typography>
              <Typography variant="subtitle1">{result.author}</Typography>
              <Typography variant="body2">
                {result.type} - {result.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultBlock;
