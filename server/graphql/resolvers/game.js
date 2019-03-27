const { withFilter } = require('graphql-subscriptions')

module.exports = {
  Game: {
    startTime: game => game.time.startTime,
    increment: game => game.time.increment,
    playerInfo: (game, _, { userId }) => {
      const now = Date.now()
      const { white, black, lastMoveTime, lastMoveBy } = game.time

      const toMove = game.fen.split(' ')[1]
      const myColour = game.whiteId === userId ? 'w' : game.blackId === userId ? 'b' : null

      return {
        myTurn: toMove === myColour,
        myColour,
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
    createGame: (_, { startTime, increment, colour }, { games, userId }) => {
      const game = games.createGame({ startTime, increment, colour, userId })
      return game.id
    },

    joinGame: (_, { id }, { games, pubsub, userId }) => {
      const game = games.joinGame(id, userId)

      if (game) {
        pubsub.publish('GAME_UPDATED', { gameUpdated: game })
        return true
      }

      return false
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
