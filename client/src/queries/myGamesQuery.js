// GraphQL-spørring som henter data om alle partier en bruker deltar i.

import gql from 'graphql-tag'

export default gql`
  {
    myGames {
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
