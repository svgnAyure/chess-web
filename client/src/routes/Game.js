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

  const { moves, captures, promotions } = formatMoves(game.legalMoves)

  return (
    <Layout.Container>
      <Layout.Top>
        <Link to="/">Home</Link>
      </Layout.Top>

      <Layout.Left>
        <LeftSidebar
          startTime={game.startTime}
          increment={game.increment}
          playerInfo={game.playerInfo}
        />
      </Layout.Left>

      <Layout.Main>
        <ChessBoard
          id={game.id}
          fen={game.fen}
          gameStatus={game.gameStatus}
          playerInfo={game.playerInfo}
          moves={moves}
          captures={captures}
          promotions={promotions}
          keySquares={game.keySquares}
        />
      </Layout.Main>

      <Layout.Right>
        <RightSidebar
          id={game.id}
          fen={game.fen}
          moveHistory={game.moveHistory}
          gameStatus={game.gameStatus}
          playerInfo={game.playerInfo}
        />
      </Layout.Right>
    </Layout.Container>
  )
}

export default Game
