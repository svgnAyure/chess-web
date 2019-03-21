import React from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  box-shadow: 0px 1px 2px #999;
  background: #f5f5f5;
  width: 250px;
  height: 512px;
  display: flex;
  flex-direction: column;
`

const LeftSidebar = props => {
  const {
    startTime,
    increment,
    playerInfo: { myColour }
  } = props

  return (
    <SidebarContainer>{`${
      myColour === 'w' || myColour === 'b' ? 'Playing' : 'Spectating'
    } a ${startTime}+${increment} game${
      myColour === 'w' ? ' as White.' : myColour === 'b' ? ' as Black.' : '.'
    }`}</SidebarContainer>
  )
}

export default LeftSidebar
