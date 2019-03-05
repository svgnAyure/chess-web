import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  render() {
    const {
      data: { loading, createGame }
    } = this.props
    if (loading) {
      return null
    }

    return (
      <>
        <h1>{`ID: ${createGame.id}`}</h1>
        <Link to={`/${createGame.id}`}>Go to game</Link>
      </>
    )
  }
}

const query = gql`
  {
    createGame {
      id
    }
  }
`

const options = {
  fetchPolicy: 'network-only'
}

export default graphql(query, { options })(Home)
