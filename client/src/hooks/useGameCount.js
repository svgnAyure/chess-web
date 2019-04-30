import { useQuery, useSubscription } from 'react-apollo-hooks'
import getGameCountQuery from '../queries/getGameCountQuery'
import gameCountUpdatedSubscription from '../queries/gameCountUpdatedSubscription'

export const useGameCount = () => {
  const { loading, data } = useQuery(getGameCountQuery, {
    fetchPolicy: 'network-only'
  })

  useSubscription(gameCountUpdatedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { getGameCount } = client.readQuery({ query: getGameCountQuery })
      client.writeQuery({
        query: getGameCountQuery,
        data: {
          getGameCount: getGameCount + subscriptionData.data.gameCountUpdated
        }
      })
    },
    skip: isNaN(data.getGameCount)
  })

  return {
    loading,
    gameCount: loading ? null : data.getGameCount
  }
}
