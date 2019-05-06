// GraphQL-subscription som ber om oppdateringer i alle partier en bruker deltar i.

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
