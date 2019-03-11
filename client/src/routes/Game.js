import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import ChessBoard from '../components/ChessBoard'
import { useGame } from '../hooks/useGame'
import { formatMoves } from '../utils/functions'

const Game = props => {
  const { loading, game } = useGame(props.match.params.id)

  if (loading) {
    return null
  }

  if (!game) {
    return <Redirect to="/" />
  }

  const { id, fen, gameStatus, playerInfo, legalMoves, keySquares } = game
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

export default Game
