import React from 'react'
import styled from 'styled-components'

import GameInfo from './GameInfo'
import MyGamesList from './MyGamesList'

const SidebarContainer = styled.div`
  width: 250px;
  height: 512px;
  display: grid;
  grid-template: 1fr 2fr / 1fr;
  row-gap: 20px;
`

const LeftSidebar = props => {
  const { id, startTime, increment, playerInfo, gameStatus } = props

  return (
    <SidebarContainer>
      <GameInfo
        id={id}
        startTime={startTime}
        increment={increment}
        playerInfo={playerInfo}
        gameStatus={gameStatus}
      />
      <MyGamesList />
    </SidebarContainer>
  )
}

export default LeftSidebar
