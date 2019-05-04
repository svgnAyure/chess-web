import gql from 'graphql-tag'

export default gql`
  mutation offerDraw($id: ID!) {
    acceptDraw(id: $id)
  }
`
