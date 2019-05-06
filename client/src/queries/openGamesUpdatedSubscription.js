// GraphQL-subscription som ber om oppdateringer i alle åpne partier.

import gql from 'graphql-tag'

export default gql`
  subscription {
    openGamesUpdated {
      id
      fen
      startTime
      increment
      status
      playerInfo {
        myColour
      }
    }
  }
`
