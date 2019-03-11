import { useQuery, useSubscription } from 'react-apollo-hooks'
import getGameQuery from '../queries/getGameQuery'
import gameUpdatedSubscription from '../queries/gameUpdatedSubscription'

export const useGame = id => {
  const { loading, data } = useQuery(getGameQuery, { variables: { id } })

  useSubscription(gameUpdatedSubscription, {
    variables: { id }
  })

  return {
    loading,
    game: loading ? null : data.getGame
  }
}
