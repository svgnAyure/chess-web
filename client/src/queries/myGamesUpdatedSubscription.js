import gql from 'graphql-tag'

export default gql`
  subscription {
    myGamesUpdated {
      id
      fen
      startTime
      increment
      status
      gameStatus {
        isFinished
        statusText
      }
      legalMoves {
        from
        to
        capture
        special
      }
      playerInfo {
        myTurn
        myColour
        whiteTimeLeft
        blackTimeLeft
      }
      keySquares {
        checkSquare
        lastMove
      }
      moveHistory
    }
  }
`
