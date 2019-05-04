import gql from 'graphql-tag'

export default gql`
  mutation resign($id: ID!) {
    resign(id: $id)
  }
`
