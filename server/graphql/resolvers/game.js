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
    },
    gameStatus: game => ({
      ...game.gameStatus,
      drawOffered: game.drawOffered ? game.drawOffered : null
    })
  },

  Query: {
    getGame: (_, { id }, { games }) => {
      const game = games.getGame(id)
      return game ? game : null
    },

    getGameCount: (_, __, { games }) => {
      return games.getGames().length
    },

    myGames: (_, __, { games, userId }) => {
      return games.getGames().filter(g => g.whiteId === userId || g.blackId === userId)
    },

    openGames: (_, __, { games }) => {
      return games.getGames().filter(g => g.status.includes('waitingFor'))
    }
  },

  Mutation: {
    createGame: (_, { startTime, increment, colour }, { games, userId, pubsub }) => {
      const game = games.createGame({ startTime, increment, colour, userId })
      pubsub.publish('GAME_CREATED', { gameCountUpdated: 1, gameCreated: game })
      return game.id
    },

    joinGame: (_, { id }, { games, pubsub, userId }) => {
      const game = games.joinGame(id, userId)
      if (game) {
        pubsub.publish('GAME_JOINED', { gameUpdated: game })
        return true
      } else {
        return false
      }
    },

    offerDraw: (_, { id }, { games, pubsub, userId }) => {
      const game = games.getGame(id)
      if (!game) {
        return false
      }

      const ids = {
        [game.whiteId]: 'w',
        [game.blackId]: 'b'
      }

      const colour = ids[userId]
      if (!colour) {
        return false
      }

      game.drawOffered = colour
      pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      return true
    },

    acceptDraw: (_, { id }, { games, pubsub, userId }) => {
      const game = games.getGame(id)
      if (!game) {
        return false
      }

      const ids = {
        [game.whiteId]: 'w',
        [game.blackId]: 'b'
      }

      const colour = ids[userId]
      if (!colour || colour === game.drawOffered) {
        return false
      }

      game.drawOffered = false
      game.playerDraw()
      pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      return true
    }
  },

  Subscription: {
    gameCountUpdated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_CREATED'])
    },
    gameUpdated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_UPDATED', 'GAME_JOINED']),
        ({ gameUpdated }, variables) => gameUpdated.id === variables.id
      )
    },
    myGamesUpdated: {
      resolve: (_, __, { userId, games }) =>
        games.getGames().filter(g => g.whiteId === userId || g.blackId === userId),
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_UPDATED', 'GAME_JOINED']),
        (payload, _, { userId }) =>
          payload.gameUpdated.whiteId === userId || payload.gameUpdated.blackId === userId
      )
    },
    openGamesUpdated: {
      resolve: (_, __, { games }) => games.getGames().filter(g => g.status.includes('waitingFor')),
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_CREATED', 'GAME_JOINED'])
    }
  }
}
