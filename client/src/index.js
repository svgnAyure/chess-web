/**
 * Rotmodulen i React-applikasjonen.
 * Importerer globale stiler, routes, og setter opp
 * ApolloProvider slik at komponentene har tilgang til
 * Apollo-klienten for utførelse av GraphQL-spørringer.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo-hooks'

import client from './apollo'
import Routes from './routes'
import Styles from './styles'

const App = (
  <ApolloProvider client={client}>
    <Styles />
    <Routes />
  </ApolloProvider>
)

ReactDOM.render(App, document.getElementById('root'))
