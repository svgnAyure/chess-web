import React from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  box-shadow: 0px 0px 20px 3px #999;
  width: 250px;
  height: 512px;
  display: flex;
  flex-direction: column;
`

const LeftSidebar = props => {
  return <SidebarContainer />
}

export default LeftSidebar
