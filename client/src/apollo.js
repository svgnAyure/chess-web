import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
  uri: 'http://109.247.216.255:4000/graphql',
  credentials: 'include'
})

const wsLink = new WebSocketLink({
  uri: 'ws://109.247.216.255:4000/subscriptions',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export default client
