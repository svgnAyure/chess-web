// React-komponent som viser åpne partier som brukere kan
// klikke på for å delta i. Den vil vises på hovedsiden, på
// høyre side i GUIet.

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useRouter } from '../hooks/useRouter'
import { useOpenGames } from '../hooks/useOpenGames'

const SidebarContainer = styled.div`
  width: 250px;
  height: 512px;
  display: grid;
  grid-template: 1fr / 1fr;
  grid-row-gap: 20px;
`

const OpenGamesListContainer = styled.div`
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
  grid-template: 32px / 1fr 1fr 2fr;
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

const OpenGamesList = props => {
  const { loading, openGames } = useOpenGames()
  const { match } = useRouter()

  return (
    <SidebarContainer>
      <OpenGamesListContainer>
        <Title>Open games</Title>
        <GamesList>
          {loading
            ? null
            : openGames.map(g => (
                <StyledLink key={g.id} to={`/${g.id}`}>
                  <GamesListItem selected={g.id === match.params.id}>
                    <ColourIndicator colour={g.status === 'waitingForBlack' ? 'b' : 'w'} />
                    <TimeControlIndicator>
                      {g.startTime}+{g.increment}
                    </TimeControlIndicator>
                    Join
                  </GamesListItem>
                </StyledLink>
              ))}
        </GamesList>
      </OpenGamesListContainer>
    </SidebarContainer>
  )
}

export default OpenGamesList
