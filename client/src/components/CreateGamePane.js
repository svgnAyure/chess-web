import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'

import { useRouter } from '../hooks/useRouter'
import createGameMutation from '../queries/createGameMutation'

const CreateGameContainer = styled.div`
  width: 512px;
  height: 512px;
  padding: 30px;
  margin: 32px;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px #999;
  background: #f5f5f5;
  display: grid;
  grid-template: auto repeat(3, 1fr) / 1fr;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const RangeInput = styled.input.attrs(props => ({
  type: 'range',
  min: props.min,
  max: props.max,
  defaultValue: props.default
}))``

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
`

const Button = styled.button``

const CreateGamePane = props => {
  const sliderOptions = [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 60, 90, 120, 150, 180]
  const [startTime, setStartTime] = useState(5)
  const [increment, setIncrement] = useState(2)
  const createGame = useMutation(createGameMutation)
  const { history } = useRouter()

  const handleChangeTime = e => {
    setStartTime(sliderOptions[e.target.value])
  }

  const handleChangeIncrement = e => {
    setIncrement(sliderOptions[e.target.value])
  }

  const handleSelectColour = async e => {
    const { id: colour } = e.currentTarget
    const res = await createGame({ variables: { startTime, increment, colour } })
    history.push(`/${res.data.createGame}`)
  }

  return (
    <CreateGameContainer>
      <SubContainer>
        <h2 style={{ alignSelf: 'center' }}>Create new game</h2>
      </SubContainer>
      <SubContainer>
        <p>
          Minutes per side: <b>{startTime}</b>
        </p>
        <RangeInput min={1} max={16} default={startTime} onChange={handleChangeTime} />
      </SubContainer>
      <SubContainer>
        <p>
          Increment in seconds: <b>{increment}</b>
        </p>
        <RangeInput min={0} max={16} default={increment} onChange={handleChangeIncrement} />
      </SubContainer>
      <SubContainer>
        <p>Choose colour:</p>
        <ButtonsContainer>
          <Button id="white" onClick={handleSelectColour}>
            <img alt="" src="/img/pieces/white_king.svg" />
            <div>White</div>
          </Button>
          <Button id="random" onClick={handleSelectColour}>
            <img alt="" src="/img/pieces/random_king.svg" />
            <div>Random</div>
          </Button>
          <Button id="black" onClick={handleSelectColour}>
            <img alt="" src="/img/pieces/black_king.svg" />
            <div>Black</div>
          </Button>
        </ButtonsContainer>
      </SubContainer>
    </CreateGameContainer>
  )
}

export default CreateGamePane
