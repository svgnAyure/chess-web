// GraphQL-mutasjon som bruker når en spiller ønsker å tilby remis.

import gql from 'graphql-tag'

export default gql`
  mutation offerDraw($id: ID!) {
    offerDraw(id: $id)
  }
`
