import React from 'react'
import styled from 'styled-components'

import { useScroll } from '../hooks/useScroll'
import { useTime } from '../hooks/useTime'

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
  box-shadow: 0px 0px 20px 3px #999;
  font-size: 2.6rem;
`

const WhiteTimer = styled(Timer)`
  grid-row: ${p => (p.isWhite ? 3 : 1)};
  background: ${p => (p.toMove === 'w' ? '#dee' : 'transparent')};
`

const BlackTimer = styled(Timer)`
  grid-row: ${p => (p.isWhite ? 1 : 3)};
  background: ${p => (p.toMove === 'b' ? '#dee' : 'transparent')};
`

const MoveList = styled.div`
  overflow-y: auto;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-auto-rows: max-content;
  box-shadow: 0px 0px 20px 3px #999;
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
    background: #dee;
  }
`

const RightSidebar = props => {
  const { isWhite } = props.playerInfo
  const toMove = props.fen.split(' ')[1]

  const moves = props.moveHistory.flatMap((m, i) => {
    const move = <Move key={`m-${i}`}>{m}</Move>
    const counter = i % 2 === 0 && <Counter key={`c-${i / 2 + 1}`}>{i / 2 + 1}</Counter>
    return i % 2 === 0 ? [counter, move] : [move]
  })

  const { scrollRef } = useScroll()
  const { whiteTime, blackTime } = useTime(0, toMove)

  return (
    <SidebarContainer>
      <MoveList ref={scrollRef}>{moves}</MoveList>
      <WhiteTimer isWhite={isWhite} toMove={toMove}>
        {whiteTime}
      </WhiteTimer>
      <BlackTimer isWhite={isWhite} toMove={toMove}>
        {blackTime}
      </BlackTimer>
    </SidebarContainer>
  )
}

export default RightSidebar
