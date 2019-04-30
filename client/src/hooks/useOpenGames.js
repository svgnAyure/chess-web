import { useQuery, useSubscription } from 'react-apollo-hooks'
import openGamesQuery from '../queries/openGamesQuery'
import openGamesUpdatedSubscription from '../queries/openGamesUpdatedSubscription'

export const useOpenGames = () => {
  const { loading, data } = useQuery(openGamesQuery, {
    fetchPolicy: 'network-only'
  })

  useSubscription(openGamesUpdatedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeQuery({
        query: openGamesQuery,
        data: { openGames: subscriptionData.data.openGamesUpdated }
      })
    },
    skip: !data.openGames
  })

  return {
    loading,
    openGames: loading ? null : data.openGames.filter(g => !g.playerInfo.myColour)
  }
}
