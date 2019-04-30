import React from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'

import * as Layout from '../components/Layout'
import ChessBoard from '../components/ChessBoard'
import JoinGamePane from '../components/JoinGamePane'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import { useGame } from '../hooks/useGame'
import { formatMoves } from '../utils/functions'

const StyledLink = styled(Link)`
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: unset;
  }

  > h1 {
    font-size: 2.5em;
  }
`

const Game = props => {
  const { loading, game } = useGame(props.match.params.id)

  if (loading) {
    return null
  }

  if (!game) {
    return <Redirect to="/" />
  }

  const { moves, captures, promotions } = formatMoves(game.legalMoves)
  const waitingForWhite = game.status === 'waitingForWhite'
  const waitingForBlack = game.status === 'waitingForBlack'
  const waitingForPlayer = waitingForBlack || waitingForWhite

  return (
    <Layout.Container>
      <Layout.Top>
        <StyledLink to="/">
          <h1>WebChess</h1>
        </StyledLink>
      </Layout.Top>

      <Layout.Left>
        <LeftSidebar
          id={game.id}
          startTime={game.startTime}
          increment={game.increment}
          playerInfo={game.playerInfo}
        />
      </Layout.Left>

      <Layout.Main>
        <ChessBoard
          id={game.id}
          fen={game.fen}
          waitingForPlayer={waitingForPlayer}
          gameStatus={game.gameStatus}
          playerInfo={game.playerInfo}
          moves={moves}
          captures={captures}
          promotions={promotions}
          keySquares={game.keySquares}
        />
        {waitingForPlayer && (
          <JoinGamePane
            id={game.id}
            waitingFor={waitingForBlack ? 'b' : waitingForWhite ? 'w' : null}
            playerInfo={game.playerInfo}
          />
        )}
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
