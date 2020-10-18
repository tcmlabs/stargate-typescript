import { ApolloProvider } from "@apollo/client";
import { AppComponent } from "next/dist/next-server/lib/router/router";
import { useApollo } from "../lib/apolloClient";

const App: AppComponent = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
