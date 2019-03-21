import React from 'react'
import styled from 'styled-components'

import { useScroll } from '../hooks/useScroll'
import { useTime } from '../hooks/useTime'
import { parseTime } from '../utils/functions'

const SidebarContainer = styled.div`
  width: 250px;
  height: 512px;
  display: grid;
  grid-template: 1fr 4fr 1fr / 1fr;
  grid-row-gap: 20px;
`

const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px #999;
  font-size: 2.6rem;
`

const WhiteTimer = styled(Timer)`
  grid-row: ${p => (p.isWhite ? 3 : 1)};
  background: ${p => (p.toMove === 'w' ? '#eff' : '#f5f5f5')};
`

const BlackTimer = styled(Timer)`
  grid-row: ${p => (p.isWhite ? 1 : 3)};
  background: ${p => (p.toMove === 'b' ? '#eff' : '#f5f5f5')};
`

const MoveList = styled.div`
  overflow-y: auto;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-auto-rows: max-content;
  box-shadow: 0px 1px 2px #999;
  background: #f5f5f5;
`

const Counter = styled.div`
  font-weight: bold;
  text-align: right;
  padding: 5px 10px;
  background: #ddd;
`

const Move = styled.div`
  padding: 5px 10px;

  :last-child {
    background: #eff;
  }
`

const RightSidebar = props => {
  const { isWhite, whiteTimeLeft, blackTimeLeft } = props.playerInfo
  const [, toMove, , , , fullMoves] = props.fen.split(' ')

  const moves = props.moveHistory.flatMap((m, i) => {
    const move = <Move key={`m-${i}`}>{m}</Move>
    const counter = i % 2 === 0 && <Counter key={`c-${i / 2 + 1}`}>{i / 2 + 1}</Counter>
    return counter ? [counter, move] : [move]
  })

  const { scrollRef } = useScroll(props.fen)
  const { whiteTime, blackTime } = useTime({ whiteTimeLeft, blackTimeLeft, toMove, fullMoves })

  return (
    <SidebarContainer>
      <MoveList ref={scrollRef}>{moves}</MoveList>
      <WhiteTimer isWhite={isWhite} toMove={toMove}>
        {parseTime(whiteTime)}
      </WhiteTimer>
      <BlackTimer isWhite={isWhite} toMove={toMove}>
        {parseTime(blackTime)}
      </BlackTimer>
    </SidebarContainer>
  )
}

export default RightSidebar
