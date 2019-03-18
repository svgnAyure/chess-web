const shortid = require('shortid')
const { withFilter } = require('graphql-subscriptions')

module.exports = {
  Game: {
    playerInfo: (game, _, { games }) => ({
      myTurn: true,
      isWhite: true
    })
  },

  Query: {
    getGame: (_, { id }, { games }) => {
      const game = games[id]
      if (!game) {
        return null
      }
      return game
    }
  },

  Mutation: {
    createGame: (_, __, { ChessGame, games }) => {
      const game = new ChessGame()
      game.id = shortid.generate()
      games[game.id] = game
      return game.id
    }
  },

  Subscription: {
    gameUpdated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('GAME_UPDATED'),
        ({ gameUpdated }, variables) => gameUpdated.id === variables.id
      )
    }
  }
}
