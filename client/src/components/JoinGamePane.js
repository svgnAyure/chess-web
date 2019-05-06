// React-komponent som representerer et panel med ulike funksjoner.
// Den vil vises på siden for individuelle partier, før selve partiet
// starter. Den gir den som startet partiet en link som han/hun kan
// dele med andre slik at de kan delta, mens andre besøkende til siden
// vil få en knapp der de kan velge å delta i partiet.

import React, { useRef } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'

import joinGameMutation from '../queries/joinGameMutation'

const JoinGameContainer = styled.div`
  position: absolute;
  top: calc(50% - 96px);
  left: calc(50% - 160px);
  width: 320px;
  height: 192px;
  padding: 20px 10px;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px #999;
  background: #f5f5f5;
  display: grid;
  grid-template: repeat(3, 1fr) / 1fr;
  place-items: center;
`

const Button = styled.button`
  padding: 5px;
  img {
    width: 45px;
    height: 45px;
  }
`

const LinkGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  button {
    height: 38px;
    width: 38px;

    img {
      height: 100%;
      width: 100%;
    }
  }
`

const LinkInput = styled.input`
  width: 100%;
  height: 32px;
  text-align: center;
  font-size: 0.8rem;
`

const JoinGamePane = props => {
  const { id, waitingFor } = props
  const colour = waitingFor === 'w' ? 'white' : 'black'
  const waitingForOther = props.playerInfo.myColour

  const joinGame = useMutation(joinGameMutation)
  const linkRef = useRef(null)

  const handleJoinGame = async e => {
    const { data } = await joinGame({ variables: { id } })
    if (!data.joinGame) {
      window.location.reload()
    }
  }

  const handleCopyLink = e => {
    linkRef.current.select()
    document.execCommand('copy')
  }

  return (
    <JoinGameContainer>
      {waitingForOther ? (
        <>
          <h3>Waiting for opponent</h3>
          <LinkGroup>
            <LinkInput
              ref={linkRef}
              value={`http://${process.env.REACT_APP_CLIENT_URL}/${id}`}
              readOnly
            />
            <Button onClick={handleCopyLink}>
              <img alt="" src="/img/copy.svg" />
            </Button>
          </LinkGroup>
          <div>Share this link to invite a player!</div>
        </>
      ) : (
        <>
          <h3>Join game</h3>
          <Button onClick={handleJoinGame}>
            <img alt="" src={`/img/pieces/${colour}_king.svg`} />
            <div>Join as {colour}</div>
          </Button>
        </>
      )}
    </JoinGameContainer>
  )
}

export default JoinGamePane
