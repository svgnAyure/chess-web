// GraphQL-mutasjon som bruker når en spiller ønsker å godta remis.

import gql from 'graphql-tag'

export default gql`
  mutation offerDraw($id: ID!) {
    acceptDraw(id: $id)
  }
`
