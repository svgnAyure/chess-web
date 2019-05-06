// GraphQL-mutasjon som brukes når en bruker ønsker å starte et parti.

import gql from 'graphql-tag'

export default gql`
  mutation($startTime: Int!, $increment: Int!, $colour: String!) {
    createGame(startTime: $startTime, increment: $increment, colour: $colour)
  }
`
