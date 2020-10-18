import { App } from "../components/App";
import Submit from "../components/Submit";
import { BookList, ALL_BOOKS_QUERY } from "../components/BookList";
import { initializeApollo } from "../lib/apolloClient";
import { NextPage } from "next";

const IndexPage: NextPage = () => (
  <App>
    <Submit />
    <BookList />
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_BOOKS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
