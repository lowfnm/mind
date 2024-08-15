import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InstantSearch } from "react-instantsearch";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./provider/apollo.tsx";
import { searchClient } from "./AlgoliaClient.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        routing={true}
        insights={true}
      >
        <App />
      </InstantSearch>
    </ApolloProvider>
  </StrictMode>
);
