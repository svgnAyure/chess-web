/**
 * Konfigurasjon av Apollo-klienten.
 */

// Importsetninger
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'localhost:4000'

// HTTP-link for sending av spørringer via HTTP.
const httpLink = new HttpLink({
  uri: `http://${SERVER_URL}/graphql`,
  credentials: 'include'
})

// WebSocket-link for overføring av data i sanntid fra serveren.
const wsLink = new WebSocketLink({
  uri: `ws://${SERVER_URL}/subscriptions`,
  options: {
    reconnect: true,
    lazy: true
  }
})

// Skiller mellom HTTP og WebSocket basert på typen GraphQL-spørring.
const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Lager en ApolloClient-instans, som kan brukes i komponentene til å hente data..
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export default client
