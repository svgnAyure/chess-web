import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import * as Layout from '../components/Layout'
import ChessBoard from '../components/ChessBoard'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
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

  const { id, fen, gameStatus, playerInfo, legalMoves, keySquares, moveHistory } = game
  const { moves, captures, promotions } = formatMoves(legalMoves)

  return (
    <Layout.Container>
      <Layout.Top>
        <Link to="/">Home</Link>
      </Layout.Top>

      <Layout.Left>
        <LeftSidebar />
      </Layout.Left>

      <Layout.Main>
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
      </Layout.Main>

      <Layout.Right>
        <RightSidebar
          id={id}
          fen={fen}
          moveHistory={moveHistory}
          gameStatus={gameStatus}
          playerInfo={playerInfo}
        />
      </Layout.Right>
    </Layout.Container>
  )
}

export default Game
