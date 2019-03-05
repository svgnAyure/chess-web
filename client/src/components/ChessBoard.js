import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import getPiece from './Piece'
import getSquare from './Square'
import { getSquareName } from '../utils/functions'

const Board = styled.div`
  background-image: url(/img/chessboard.svg);
  width: 512px;
  height: 512px;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(8, 1fr);
`

class ChessBoard extends React.Component {
  state = {
    selectedSquare: '',
    canMoveTo: [],
    canCapture: []
  }

  resetState = () => {
    this.setState({
      activeSquare: '',
      canMoveTo: [],
      canCapture: []
    })
  }

  handleClick = e => {
    const selectedSquare = e.currentTarget.id
    const hasPiece = e.currentTarget.children.length
    const { activeSquare, canMoveTo, canCapture } = this.state

    if ([...canMoveTo, ...canCapture].includes(selectedSquare)) {
      this.props.mutate({
        variables: { id: this.props.id, from: activeSquare, to: selectedSquare }
      })
      return this.resetState()
    }

    if (selectedSquare === activeSquare || !hasPiece) {
      return this.resetState()
    }

    if (hasPiece) {
      return this.setState({
        activeSquare: selectedSquare,
        canMoveTo: this.props.moves[selectedSquare] || [],
        canCapture: this.props.captures[selectedSquare] || []
      })
    }
  }

  renderSquare(x, y, c) {
    const id = getSquareName(x, 7 - y)
    const Piece = getPiece(c)
    const Square = getSquare({
      active: this.state.activeSquare === id,
      canMoveTo: this.state.canMoveTo.includes(id),
      canCapture: this.state.canCapture.includes(id),
      lastMove: this.props.keySquares.lastMove.includes(id),
      inCheck: this.props.keySquares.checkSquare === id
    })

    return (
      <Square key={id} id={id} onClick={this.handleClick}>
        {Piece && <Piece />}
      </Square>
    )
  }

  renderSquares() {
    const { isWhite } = this.props.playerInfo
    const chars = this.props.fen.split(' ')[0].split('/')
    const rows = chars.flatMap((r, y) => {
      let x = 0
      return r.split('').flatMap(c => {
        if (isNaN(c)) {
          return this.renderSquare(x++, y, c)
        }
        return [...Array(+c)].map(() => {
          return this.renderSquare(x++, y)
        })
      })
    })
    return isWhite ? [...rows] : [...rows.reverse()]
  }

  render() {
    return <Board>{this.renderSquares()}</Board>
  }
}

const makeMoveMutation = gql`
  mutation($id: ID!, $from: String!, $to: String!, $promoteTo: String) {
    makeMove(id: $id, from: $from, to: $to, promoteTo: $promoteTo)
  }
`

export default graphql(makeMoveMutation)(ChessBoard)
