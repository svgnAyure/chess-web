import gql from 'graphql-tag'
import React from 'react'
import { graphql } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'

import ChessBoard from '../components/ChessBoard'
import { formatMoves } from '../utils/functions'

class Game extends React.Component {
  render() {
    const { loading, getGame } = this.props.data
    if (loading) {
      return null
    }

    if (!getGame) {
      return <Redirect to="/" />
    }

    const { id, fen, gameStatus, playerInfo, legalMoves, keySquares } = getGame
    const { moves, captures, promotions } = formatMoves(legalMoves)

    return (
      <>
        <ChessBoard
          id={id}
          fen={fen}
          gameStatus={gameStatus}
          playerInfo={playerInfo}
          moves={moves}
          captures={captures}
          promotions={promotions}
          keySquares={keySquares}
        />
        <Link to="/">Home</Link>
      </>
    )
  }
}

const getGameQuery = gql`
  query($id: ID!) {
    getGame(id: $id) {
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
    }
  }
`

export default graphql(getGameQuery, {
  options: props => ({
    variables: { id: props.match.params.id }
  })
})(Game)
