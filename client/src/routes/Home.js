import React from 'react'
import { Link } from 'react-router-dom'

import * as Layout from '../components/Layout'
import CreateGamePane from '../components/CreateGamePane'

const Home = props => (
  <Layout.Container>
    <Layout.Top>
      <Link to="/">Home</Link>
    </Layout.Top>
    <Layout.Main>
      <CreateGamePane />
    </Layout.Main>
  </Layout.Container>
)

export default Home
