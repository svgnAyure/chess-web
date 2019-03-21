import gql from 'graphql-tag'

export default gql`
  mutation($startTime: Int!, $increment: Int!, $colour: String!) {
    createGame(startTime: $startTime, increment: $increment, colour: $colour)
  }
`
