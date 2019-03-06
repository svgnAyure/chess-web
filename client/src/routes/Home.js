import gql from 'graphql-tag'
import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    id: null
  }

  async componentDidMount() {
    const { data } = await this.props.mutate()
    this.setState({ id: data.createGame })
  }

  render() {
    if (!this.state.id) {
      return null
    }

    return (
      <>
        <h1>{`ID: ${this.state.id}`}</h1>
        <Link to={`/${this.state.id}`}>Go to game</Link>
      </>
    )
  }
}

const createGameMutation = gql`
  mutation {
    createGame
  }
`

export default graphql(createGameMutation)(Home)
