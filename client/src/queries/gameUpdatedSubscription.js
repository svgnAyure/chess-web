import gql from 'graphql-tag'

export default gql`
  subscription {
    gameUpdated {
      id
      fen
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
        isWhite
      }
      keySquares {
        checkSquare
        lastMove
      }
      moveHistory
    }
  }
`
