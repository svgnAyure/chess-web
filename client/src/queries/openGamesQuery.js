import gql from 'graphql-tag'

export default gql`
  {
    openGames {
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
