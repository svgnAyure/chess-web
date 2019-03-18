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
