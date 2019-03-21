import gql from 'graphql-tag'

export default gql`
  query($id: ID!) {
    getGame(id: $id) {
      id
      fen
      startTime
      increment
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
