import React from 'react'
import styled from 'styled-components'

const GameActionContainer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  column-gap: 5px;
`

const Button = styled.button`
  padding: 5px;

  img {
    height: 24px;
  }
`

const GameActionPane = props => {
  const handleDraw = () => {
    console.log(`Drew in ${props.id}`)
  }

  const handleResign = () => {
    console.log(`Resigned in ${props.id}`)
  }

  return (
    <GameActionContainer>
      <Button onClick={handleDraw}>
        <img alt="" src="/img/handshake.svg" />
        <div>Offer draw</div>
      </Button>
      <Button onClick={handleResign}>
        <img alt="" src="/img/white_flag.svg" />
        <div>Resign</div>
      </Button>
    </GameActionContainer>
  )
}

export default GameActionPane
