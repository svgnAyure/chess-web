import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'

import getPiece from './Piece'
import getSquare from './Square'
import { getSquareName } from '../utils/functions'
import makeMoveMutation from '../queries/makeMoveMutation'

const Board = styled.div`
  background-image: url(/img/chessboard.svg);
  width: 512px;
  height: 512px;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(8, 1fr);
`

const ChessBoard = props => {
  const [activeSquare, setActiveSquare] = useState('')
  const [canMoveTo, setCanMoveTo] = useState([])
  const [canCapture, setCanCapture] = useState([])
  const makeMove = useMutation(makeMoveMutation)

  const resetState = () => {
    setActiveSquare('')
    setCanMoveTo([])
    setCanCapture([])
  }

  const handleClick = e => {
    const selectedSquare = e.currentTarget.id
    const hasPiece = e.currentTarget.children.length

    if ([...canMoveTo, ...canCapture].includes(selectedSquare)) {
      makeMove({
        variables: { id: props.id, from: activeSquare, to: selectedSquare }
      })
      return resetState()
    }

    if (selectedSquare === activeSquare || !hasPiece) {
      return resetState()
    }

    if (hasPiece) {
      setActiveSquare(selectedSquare)
      setCanMoveTo(props.moves[selectedSquare] || [])
      setCanCapture(props.captures[selectedSquare] || [])
      return
    }
  }

  const renderSquare = (x, y, c) => {
    const id = getSquareName(x, 7 - y)
    const Piece = getPiece(c)
    const Square = getSquare({
      active: activeSquare === id,
      canMoveTo: canMoveTo.includes(id),
      canCapture: canCapture.includes(id),
      lastMove: props.keySquares.lastMove.includes(id),
      inCheck: props.keySquares.checkSquare === id
    })

    return (
      <Square key={id} id={id} onClick={handleClick}>
        {Piece && <Piece />}
      </Square>
    )
  }

  const renderSquares = () => {
    const { isWhite } = props.playerInfo
    const chars = props.fen.split(' ')[0].split('/')
    const rows = chars.flatMap((r, y) => {
      let x = 0
      return r.split('').flatMap(c => {
        if (isNaN(c)) {
          return renderSquare(x++, y, c)
        }
        return [...Array(+c)].map(() => {
          return renderSquare(x++, y)
        })
      })
    })
    return isWhite ? rows : [...rows.reverse()]
  }

  return <Board>{renderSquares()}</Board>
}

export default ChessBoard
