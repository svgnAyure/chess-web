/**
 * Hovedkomponent for websidens rot ('/').
 * Denne komponenten vil vise applikasjonens hovedside,
 * der brukere kan opprette sjakkpartier og samtidig se
 * åpne partier, samt partier de deltar i til enhver tid.
 */

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import * as Layout from '../components/Layout'
import CreateGamePane from '../components/CreateGamePane'
import HomeLeftSidebar from '../components/HomeLeftSidebar'
import OpenGamesList from '../components/OpenGamesList'

const StyledLink = styled(Link)`
  &,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: unset;
  }

  > h1 {
    font-size: 2.5em;
  }
`

const Home = props => (
  <Layout.Container>
    <Layout.Top>
      <StyledLink to="/">
        <h1>WebChess</h1>
      </StyledLink>
    </Layout.Top>

    <Layout.Left>
      <HomeLeftSidebar />
    </Layout.Left>

    <Layout.Main>
      <CreateGamePane />
    </Layout.Main>

    <Layout.Right>
      <OpenGamesList />
    </Layout.Right>
  </Layout.Container>
)

export default Home
