import React from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-boost';
import { HttpLink } from 'apollo-boost';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './index.css';
import App from './App';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:9002/graphql'
    }),
    cache: new InMemoryCache()
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
