// React-komponent som representerer selve sjakkbrettet.
// Her vil alle feltene og alle brikkene bli vist, og komponenten
// vil muliggjøre flytting av brikker både ved kun å klikke, og ved
// å klikke og dra brikkene fra felt til felt.

import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'

import getPiece from './Piece'
import getSquare from './Square'
import { getSquareName } from '../utils/functions'
import makeMoveMutation from '../queries/makeMoveMutation'

const BoardFrame = styled.div`
  position: relative;
  display: grid;
  grid-template: 1fr 16fr 1fr / 1fr 16fr 1fr;
  width: fit-content;
  height: fit-content;
`

const ColLabels = styled.div`
  grid-row: 3;
  grid-column: 2;
  display: flex;
  flex-direction: ${p => (p.myColour === 'b' ? 'row-reverse' : 'row')};
`

const RowLabels = styled.div`
  grid-row: 2;
  grid-column: 1;
  display: flex;
  flex-direction: ${p => (p.myColour === 'b' ? 'column-reverse' : 'column')};
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

const DragImage = styled.div.attrs(p => ({
  style: {
    left: p.x - 32,
    top: p.y - 32
  }
}))`
  width: 64px;
  height: 64px;
  position: fixed;
  pointer-events: none;
`

const ChessBoard = props => {
  const [selectedSquare, setSelectedSquare] = useState('')
  const [draggedSquare, setDraggedSquare] = useState('')
  const [dragCoordinates, setDragCoordinates] = useState({ x: 0, y: 0 })
  const [dragClassName, setDragClassName] = useState(null)

  const makeMove = useMutation(makeMoveMutation)
  const canMoveTo = props.moves[selectedSquare] || []
  const canCapture = props.captures[selectedSquare] || []

  const handleMouseMove = e => {
    if (draggedSquare) {
      const { pageX: x, pageY: y } = e
      setDragCoordinates({ x, y })
    }
  }

  const handleMouseLeave = e => {
    setSelectedSquare('')
    setDraggedSquare('')
  }

  const handleClick = e => {
    setSelectedSquare('')
  }

  const handleMouseDown = e => {
    e.preventDefault()

    if (props.waitingForPlayer || !props.playerInfo.myTurn || props.gameStatus.isFinished) {
      return
    }

    const { pageX: x, pageY: y } = e
    const { id: square, children } = e.currentTarget

    if ([...canMoveTo, ...canCapture].includes(square)) {
      handleMove({ from: selectedSquare, to: square })
      setSelectedSquare('')
    } else if (children.length) {
      setSelectedSquare(square)
      setDraggedSquare(square)
      setDragClassName(children[0].className)
    } else {
      setSelectedSquare('')
    }
    setDragCoordinates({ x, y })
  }

  const handleMouseUp = e => {
    const { id: square } = e.currentTarget
    if (draggedSquare && square !== draggedSquare) {
      if ([...canMoveTo, ...canCapture].includes(square)) {
        handleMove({ from: selectedSquare, to: square })
      }
      setSelectedSquare('')
    }
    setDraggedSquare('')
  }

  const handleMove = async ({ from, to }) => {
    const { data } = await makeMove({
      variables: { id: props.id, from, to }
    })

    if (!data.makeMove) {
      window.location.reload()
    }
  }

  // Funksjon som returnerer individuelle felter basert på
  // hvilken type trekk feltet er involvert i i øyeblikket.
  // Tegner også brikker dersom det befinner seg brikker der.
  const renderSquare = (x, y, c) => {
    const id = getSquareName(x, 7 - y)
    const Piece = getPiece(c)
    const Square = getSquare({
      active: selectedSquare === id,
      canMoveTo: canMoveTo.includes(id),
      canCapture: canCapture.includes(id),
      lastMove: props.keySquares.lastMove.includes(id),
      inCheck: props.keySquares.checkSquare === id
    })

    return (
      <Square
        key={id}
        id={id}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {Piece && <Piece isBeingDragged={draggedSquare === id} />}
      </Square>
    )
  }

  // Funksjon som returnerer feltene på brettet.
  // For svart vil rekkefølgen reverseres slik at begge
  // spillerne alltid ser brettet fra sin synsvinkel.
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
      <Board onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {renderSquares()}
      </Board>
      <RowLabels myColour={props.playerInfo.myColour}>
        {['8', '7', '6', '5', '4', '3', '2', '1'].map(i => (
          <Label key={i}>{i}</Label>
        ))}
      </RowLabels>
      <ColLabels myColour={props.playerInfo.myColour}>
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(i => (
          <Label key={i}>{i}</Label>
        ))}
      </ColLabels>
      {draggedSquare && (
        <DragImage className={dragClassName} x={dragCoordinates.x} y={dragCoordinates.y} />
      )}
    </BoardFrame>
  )
}

export default ChessBoard
