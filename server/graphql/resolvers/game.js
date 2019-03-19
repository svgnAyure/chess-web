const { withFilter } = require('graphql-subscriptions')

module.exports = {
  Game: {
    startTime: game => game.time.startTime,
    increment: game => game.time.increment,
    playerInfo: (game, _, {}) => {
      const now = Date.now()
      const { white, black, lastMoveTime, lastMoveBy } = game.time
      return {
        myTurn: true,
        isWhite: true,
        whiteTimeLeft: Math.max(white - (lastMoveBy === 'b' ? now - lastMoveTime : 0), 0),
        blackTimeLeft: Math.max(black - (lastMoveBy === 'w' ? now - lastMoveTime : 0), 0)
      }
    }
  },

  Query: {
    getGame: (_, { id }, { games }) => {
      const game = games.getGame(id)
      return game ? game : null
    }
  },

  Mutation: {
    createGame: (_, { startTime, increment }, { games }) => {
      const game = games.createGame({ startTime: 0.1, increment })
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
