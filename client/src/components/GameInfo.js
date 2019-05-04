import React from 'react'
import styled from 'styled-components'

import GameActionPane from './GameActionPane'

const GameInfoContainer = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 1px 2px #999;
  padding: 15px;
  display: grid;
  grid-template: 1fr 1fr 2fr / 1fr;
  place-items: center;
  place-content: center;
`

const GameInfo = props => {
  const playing = props.playerInfo.myColour
  const colour = playing === 'w' ? 'White' : 'Black'

  return (
    <GameInfoContainer>
      <div>
        <b>{playing ? `Playing as ${colour}` : 'Spectating game'}</b>
      </div>
      <div>
        Time control: {props.startTime}+{props.increment}
      </div>
      {playing && !props.gameStatus.isFinished ? (
        <GameActionPane id={props.id} playerInfo={props.playerInfo} gameStatus={props.gameStatus} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <b>Game over</b>
          <br />
          {props.gameStatus.statusText}
        </div>
      )}
    </GameInfoContainer>
  )
}

export default GameInfo
