import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  "4WK61QBPDU",
  "a3a8a3edba3b7ba9dad65b2984b91e69"
);

const index = searchClient.initIndex('algolia-recommendation-data');

export { index, searchClient };