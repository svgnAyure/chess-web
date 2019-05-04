import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useRouter } from '../hooks/useRouter'
import { useMyGames } from '../hooks/useMyGames'
import { useTime } from '../hooks/useTime'
import { parseTime } from '../utils/functions'

const MyGamesListContainer = styled.div`
  background: #f5f5f5;
  box-shadow: 0px 1px 2px #999;
  padding: 15px;
  display: grid;
  grid-template: auto 1fr / 1fr;
  overflow-y: hidden;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: unset;
  }
`

const Title = styled.h5`
  margin: 0;
  padding-bottom: 10px;
  color: #666;
  border-bottom: 1px solid #ddd;
  text-align: center;
`

const GamesList = styled.div`
  overflow-y: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;

  :hover {
    overflow-y: overlay;
  }
`

const GamesListItem = styled.div`
  display: grid;
  grid-template: 32px / 1fr 2fr 2fr;
  place-items: center;
  border-bottom: 1px solid #ddd;
  border-left: 3px solid ${p => (p.selected ? '#666' : 'transparent')};
  border-right: 3px solid ${p => (p.selected ? '#666' : 'transparent')};

  :hover {
    border-left: 3px solid #999;
    border-right: 3px solid #999;
    border-bottom: 1px solid transparent;
    background: #dee;
  }
`

const ColourIndicator = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background: ${p => (p.colour === 'w' ? '#fff' : '#333')};
  color: ${p => (p.colour === 'w' ? '#333' : '#fff')};
  text-align: center;
  font-weight: bold;
`

const TimeControlIndicator = styled.div``

const TimeLeft = props => {
  const { myColour, whiteTimeLeft, blackTimeLeft } = props.game.playerInfo
  const { isFinished } = props.game.gameStatus
  const [, toMove, , , , fullMoves] = props.game.fen.split(' ')

  const { whiteTime, blackTime } = useTime({
    whiteTimeLeft,
    blackTimeLeft,
    toMove,
    fullMoves,
    isFinished
  })

  const myTimeLeft = myColour === 'w' ? whiteTime : blackTime

  return <TimeLeftIndicator>{parseTime(myTimeLeft)}</TimeLeftIndicator>
}

const TimeLeftIndicator = styled.div`
  padding-right: 20px;
  justify-self: right;
`

const MyGamesList = props => {
  const { loading, myGames } = useMyGames()
  const { match } = useRouter()

  return (
    <MyGamesListContainer>
      <Title>My games</Title>
      <GamesList>
        {loading
          ? null
          : myGames.map(g => (
              <StyledLink key={g.id} to={`/${g.id}`}>
                <GamesListItem selected={g.id === match.params.id}>
                  <ColourIndicator colour={g.playerInfo.myColour}>
                    {['ready', 'inProgress'].includes(g.status) && g.playerInfo.myTurn ? '!' : ''}
                  </ColourIndicator>
                  <TimeControlIndicator>
                    {g.startTime}+{g.increment}
                  </TimeControlIndicator>
                  {g.gameStatus.isFinished ? null : <TimeLeft game={g} />}
                </GamesListItem>
              </StyledLink>
            ))}
      </GamesList>
    </MyGamesListContainer>
  )
}

export default MyGamesList
