// GraphQL-mutasjon som lar bruker bli med på et parti.

import gql from 'graphql-tag'

export default gql`
  mutation($id: ID!) {
    joinGame(id: $id)
  }
`
