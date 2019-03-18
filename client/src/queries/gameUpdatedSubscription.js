import gql from 'graphql-tag'

export default gql`
  subscription($id: ID!) {
    gameUpdated(id: $id) {
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
