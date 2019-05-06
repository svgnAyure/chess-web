// GraphQL-mutasjon som lar spillere gi opp partier.

import gql from 'graphql-tag'

export default gql`
  mutation resign($id: ID!) {
    resign(id: $id)
  }
`
