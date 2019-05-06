// React-hook som utfører spørringer og subscriptions og
// tilgjengeliggjør oppdaterte data om alle sjakkpartier
// en bruker deltar i for bruk i applikasjonens komponenter.

import { useQuery, useSubscription } from 'react-apollo-hooks'
import myGamesQuery from '../queries/myGamesQuery'
import myGamesUpdatedSubscription from '../queries/myGamesUpdatedSubscription'

export const useMyGames = () => {
  const { loading, data } = useQuery(myGamesQuery, {
    fetchPolicy: 'network-only'
  })

  useSubscription(myGamesUpdatedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeQuery({
        query: myGamesQuery,
        data: { myGames: subscriptionData.data.myGamesUpdated }
      })
    },
    skip: !data.myGames
  })

  return {
    loading,
    myGames: loading ? null : data.myGames
  }
}
