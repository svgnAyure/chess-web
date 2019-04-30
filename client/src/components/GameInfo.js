import React from 'react'
import styled from 'styled-components'

import GameActionPane from './GameActionPane'

const GameInfoContainer = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 1px 2px #999;
  padding: 15px;
  display: grid;
  grid-template: 1fr 1fr 2fr / 1fr;
  place-items: stretch;
`

const GameInfo = props => {
  const playing = props.playerInfo.myColour
  const colour = playing === 'w' ? 'White' : 'Black'

  return (
    <GameInfoContainer>
      <div>{playing ? `Playing as ${colour}` : 'Spectating game'}</div>
      <div>
        Time control: {props.startTime}+{props.increment}
      </div>
      {playing && <GameActionPane id={props.id} />}
    </GameInfoContainer>
  )
}

export default GameInfo
