// GraphQL-mutasjon som lar spillere gjøre trekk i et gitt sjakkparti.

import gql from 'graphql-tag'

export default gql`
  mutation($id: ID!, $from: String!, $to: String!, $promoteTo: String) {
    makeMove(id: $id, from: $from, to: $to, promoteTo: $promoteTo)
  }
`
