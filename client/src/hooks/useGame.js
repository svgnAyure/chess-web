// React-hook som utfører spørringer og subscriptions og
// tilgjengeliggjør oppdaterte data om gitte sjakkpartier
// for bruk i applikasjonens komponenter.

import { useQuery, useSubscription } from 'react-apollo-hooks'
import getGameQuery from '../queries/getGameQuery'
import gameUpdatedSubscription from '../queries/gameUpdatedSubscription'

export const useGame = id => {
  const { loading, data } = useQuery(getGameQuery, {
    variables: { id },
    fetchPolicy: 'network-only'
  })

  useSubscription(gameUpdatedSubscription, {
    variables: { id },
    skip: !data.getGame
  })

  return {
    loading,
    game: loading ? null : data.getGame
  }
}
