// React-komponent som representerer en knappemeny der brukeren
// kan velge å tilby/godta remis, eller å gi opp partiet.

import React from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'

import offerDrawMutation from '../queries/offerDrawMutation'
import acceptDrawMutation from '../queries/acceptDrawMutation'
import resignMutation from '../queries/resignMutation'

const GameActionContainer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  column-gap: 5px;
`

const Button = styled.button`
  padding: 5px;
  box-shadow: ${p => (p.outline ? '0px 0px 3px 1px blue' : '')};

  img {
    height: 24px;
  }
`

const GameActionPane = props => {
  const offerDraw = useMutation(offerDrawMutation, { variables: { id: props.id } })
  const acceptDraw = useMutation(acceptDrawMutation, { variables: { id: props.id } })
  const resign = useMutation(resignMutation, { variables: { id: props.id } })

  const myColour = props.playerInfo.myColour
  const drawOffered = props.gameStatus.drawOffered

  const handleDraw = () => {
    if (drawOffered) {
      acceptDraw()
    } else {
      offerDraw()
    }
  }

  const handleResign = () => {
    resign()
  }

  return (
    <GameActionContainer>
      <Button onClick={handleDraw} outline={drawOffered}>
        <img alt="" src="/img/handshake.svg" />
        <div>
          {drawOffered ? (drawOffered === myColour ? 'Draw offered' : 'Accept draw') : 'Offer draw'}
        </div>
      </Button>
      <Button onClick={handleResign}>
        <img alt="" src="/img/white_flag.svg" />
        <div>Resign</div>
      </Button>
    </GameActionContainer>
  )
}

export default GameActionPane
