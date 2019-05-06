// GraphQL-subscription som ber om oppdatering når et parti oppdateres.

import gql from 'graphql-tag'

export default gql`
  subscription($id: ID!) {
    gameUpdated(id: $id) {
      id
      fen
      startTime
      increment
      status
      gameStatus {
        isFinished
        statusText
        drawOffered
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
