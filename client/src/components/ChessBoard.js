import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'

import getPiece from './Piece'
import getSquare from './Square'
import { getSquareName } from '../utils/functions'
import makeMoveMutation from '../queries/makeMoveMutation'

const BoardFrame = styled.div`
  display: grid;
  grid-template: 1fr 16fr 1fr / 1fr 16fr 1fr;
  width: fit-content;
  height: fit-content;
`

const ColLabels = styled.div`
  grid-row: 3;
  grid-column: 2;
  display: flex;
  flex-direction: ${props => (props.isWhite ? 'row' : 'row-reverse')};
`

const RowLabels = styled.div`
  grid-row: 2;
  grid-column: 1;
  display: flex;
  flex-direction: ${props => (props.isWhite ? 'column' : 'column-reverse')};
`

const Label = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Board = styled.div`
  background-image: url(/img/chessboard.svg);
  width: 512px;
  height: 512px;
  box-shadow: 0px 1px 2px #999;
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-template: repeat(8, 1fr) / repeat(8, 1fr);
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
    const { myColour } = props.playerInfo
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
    return myColour === 'b' ? [...rows.reverse()] : rows
  }

  return (
    <BoardFrame>
      <Board>{renderSquares()}</Board>
      <RowLabels isWhite={props.playerInfo.isWhite}>
        {['8', '7', '6', '5', '4', '3', '2', '1'].map(i => (
          <Label key={i}>{i}</Label>
        ))}
      </RowLabels>
      <ColLabels isWhite={props.playerInfo.isWhite}>
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(i => (
          <Label key={i}>{i}</Label>
        ))}
      </ColLabels>
    </BoardFrame>
  )
}

export default ChessBoard
