// React-komponent som representerer menyen til venstre i
// GUIet på hovedsiden i applikasjonen. Den vil vise generell
// informasjon om applikasjonen, samt listen over partier
// som brukeren deltar i.

import React from 'react'
import styled from 'styled-components'

import GeneralInfo from './GeneralInfo'
import MyGamesList from './MyGamesList'

const SidebarContainer = styled.div`
  width: 250px;
  height: 512px;
  display: grid;
  grid-template: 1fr 2fr / 1fr;
  row-gap: 20px;
`

const LeftSidebar = props => {
  return (
    <SidebarContainer>
      <GeneralInfo />
      <MyGamesList />
    </SidebarContainer>
  )
}

export default LeftSidebar
