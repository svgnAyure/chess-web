import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template: 64px min-content / 1fr max-content 1fr;
  grid-column-gap: 10px;
`

export const Top = styled.div`
  grid-row: 1;
  grid-column: 1 / span 3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
`

export const Left = styled.div`
  grid-row: 2;
  grid-column: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Main = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const Right = styled.div`
  grid-row: 2;
  grid-column: 3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
