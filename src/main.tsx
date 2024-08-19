import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { InstantSearch } from 'react-instantsearch';
import { App } from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './provider/apollo';
import { searchClient } from './client/algolia';

import './index.css';

createRoot(document.getElementById('root')!).render(
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
  </StrictMode>,
);
