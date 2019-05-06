// GraphQL-subscription som ber om oppdateringer om antall aktive partier.

import gql from 'graphql-tag'

export default gql`
  subscription {
    gameCountUpdated
  }
`
