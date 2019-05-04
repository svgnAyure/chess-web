import gql from 'graphql-tag'

export default gql`
  query($id: ID!) {
    getGame(id: $id) {
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
