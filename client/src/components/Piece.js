import styled from 'styled-components'

const Piece = styled.div`
  background-size: 100%;
  width: 100%;
  height: 100%;
  opacity: ${p => (p.isBeingDragged ? 0.3 : 1)};
`

const BlackPawn = styled(Piece)`
  background-image: url(/img/pieces/black_pawn.svg);
`

const BlackKnight = styled(Piece)`
  background-image: url(/img/pieces/black_knight.svg);
`

const BlackBishop = styled(Piece)`
  background-image: url(/img/pieces/black_bishop.svg);
`

const BlackRook = styled(Piece)`
  background-image: url(/img/pieces/black_rook.svg);
`

const BlackQueen = styled(Piece)`
  background-image: url(/img/pieces/black_queen.svg);
`

const BlackKing = styled(Piece)`
  background-image: url(/img/pieces/black_king.svg);
`

const WhitePawn = styled(Piece)`
  background-image: url(/img/pieces/white_pawn.svg);
`

const WhiteKnight = styled(Piece)`
  background-image: url(/img/pieces/white_knight.svg);
`

const WhiteBishop = styled(Piece)`
  background-image: url(/img/pieces/white_bishop.svg);
`

const WhiteRook = styled(Piece)`
  background-image: url(/img/pieces/white_rook.svg);
`

const WhiteQueen = styled(Piece)`
  background-image: url(/img/pieces/white_queen.svg);
`

const WhiteKing = styled(Piece)`
  background-image: url(/img/pieces/white_king.svg);
`

export default char => {
  const pieces = {
    p: BlackPawn,
    n: BlackKnight,
    b: BlackBishop,
    r: BlackRook,
    q: BlackQueen,
    k: BlackKing,
    P: WhitePawn,
    N: WhiteKnight,
    B: WhiteBishop,
    R: WhiteRook,
    Q: WhiteQueen,
    K: WhiteKing
  }
  return pieces[char]
}
