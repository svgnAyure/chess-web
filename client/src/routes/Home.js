import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { Link } from 'react-router-dom'
import createGameMutation from '../queries/createGameMutation'

const Home = props => {
  const [id, setId] = useState(null)
  const createGame = useMutation(createGameMutation)

  useEffect(() => {
    createGame({
      update: (_, mutationResult) => {
        setId(mutationResult.data.createGame)
      }
    })
  }, [])

  if (!id) {
    return null
  }

  return (
    <>
      <h1>{`ID: ${id}`}</h1>
      <Link to={`/${id}`}>Go to game</Link>
    </>
  )
}

export default Home
