import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { formatMoves } from '../utils/functions'
import ChessBoard from '../components/ChessBoard'

class Game extends React.Component {
  render() {
    const { loading, getGame } = this.props.data
    if (loading) {
      return null
    }

    if (!getGame) {
      return <Redirect to="/" />
    }

    const { id, fen, legalMoves, toMove, lastMove, inCheck } = getGame
    const { moves, captures } = formatMoves(legalMoves)

    return (
      <>
        <ChessBoard
          id={id}
          fen={fen}
          toMove={toMove}
          lastMove={lastMove}
          inCheck={inCheck}
          moves={moves}
          captures={captures}
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
      inCheck
      toMove
      lastMove
      legalMoves {
        from
        to
        capture
      }
    }
  }
`

export default graphql(getGameQuery, {
  options: props => ({
    variables: { id: props.match.params.id }
  })
})(Game)
