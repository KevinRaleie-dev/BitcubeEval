import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ChakraProvider } from '@chakra-ui/react';
import { getAccessToken } from './token';
import { App } from './App';

const errors = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, {headers}) => {

  const token = getAccessToken();
  if(token) {
    return {
      headers: {
        ...headers,
        authorization: `bearer ${token}`
      }
    }
  }
});

const client = new ApolloClient({
  link: errors.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  credentials: "include",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById('root')
);