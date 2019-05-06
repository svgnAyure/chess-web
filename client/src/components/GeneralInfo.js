// React-komponent som representerer generell info om applikasjonen.
// Den viser blant annet antall aktive partier til enhver tid.

import React from 'react'
import styled from 'styled-components'

import { useGameCount } from '../hooks/useGameCount'

const GeneralInfoContainer = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 1px 2px #999;
  padding: 15px;
  display: grid;
  place-items: center;
  place-content: space-evenly center;
`

const GeneralInfo = props => {
  const { loading, gameCount } = useGameCount()

  return (
    <GeneralInfoContainer>
      <div>
        <h3 style={{ margin: 0 }}>WebChess</h3>
      </div>
      <div>Play chess online!</div>
      <div>
        <b>{loading ? 0 : gameCount}</b> active {gameCount === 1 ? 'game' : 'games'}
      </div>
    </GeneralInfoContainer>
  )
}

export default GeneralInfo
