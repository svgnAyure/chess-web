// Modul som bestemmer hvilken type felt som skal opprettes
// basert på ulike typer trekk. For eksempel skal trekk til
// ledige felter markeres annerledes enn trekk til opptatte
// felter, og denne filen inneholder disse stildefinisjonene.

import styled from 'styled-components'

const Square = styled.div`
  background: transparent;
`

const ActiveSquare = styled(Square)`
  background: rgba(20, 85, 30, 0.5);
`

const CanMoveToSquare = styled(Square)`
  background: radial-gradient(rgba(20, 85, 30, 0.3) 17%, transparent 0);

  :hover {
    background: rgba(20, 85, 30, 0.3);
  }
`

const CanCaptureSquare = styled(Square)`
  background: radial-gradient(transparent 75%, rgba(20, 85, 0, 0.3) 0);

  :hover {
    background: rgba(20, 85, 30, 0.3);
  }
`

const LastMoveSquare = styled(Square)`
  background: rgba(155, 199, 0, 0.4);
`

const InCheckSquare = styled(Square)`
  background: radial-gradient(red 0%, red 25%, transparent 90%, transparent 100%);
`

export default options => {
  const states = {
    active: ActiveSquare,
    canMoveTo: CanMoveToSquare,
    canCapture: CanCaptureSquare,
    lastMove: LastMoveSquare,
    inCheck: InCheckSquare
  }

  const values = Object.entries(states)
    .filter(s => options[s[0]])
    .map(s => s[1])

  return values[0] || Square
}
