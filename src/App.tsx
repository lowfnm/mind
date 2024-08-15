import { useState } from "react";
import { useQuery } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GET_ASSESSMENTS } from "./graphql/query/getAssessment";
import CustomCard from "./components/Card/Card";
import { AppProvider } from "./context/AppContext";
import ResultBlock from "./components/Result/Result";

const App = () => {
  const { loading, error, data } = useQuery(GET_ASSESSMENTS);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <AppProvider>
      <Container>
        <Grid container spacing={3} justifyContent={"center"}>
          {isSubmitted ? (
            <ResultBlock />
          ) : (
            data.assessmentCollection.items.map((assessment: any) => (
              <Grid item xs={12} sm={10} md={8} key={assessment.slug}>
                <CustomCard
                  title={assessment.name}
                  description={documentToReactComponents(assessment.intro.json) as any[]}
                  questions={assessment.questions}
                  imageUrl=""
                  handleSubmit={handleSubmit}
                  totalPages={assessment.questions?.pages.length || 0}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </AppProvider>
  );
};

export default App;
