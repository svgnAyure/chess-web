// Modul som inneholder resolver-funksjoner for GraphQL-serveren.
// Disse funksjonene definerer hvordan GraphQL skal hente nødvendig
// data både fra eksterne kilder og fra andre objekter.

const { withFilter } = require('graphql-subscriptions')

module.exports = {
  Game: {
    // Hvordan finne attributten startTime
    startTime: game => game.time.startTime,

    // Hvordan finne attributten increment
    increment: game => game.time.increment,

    // Hvordan finne objektet playerInfo
    // Disse dataene vil variere basert på hvilken
    // bruker som utførte spørringen i front-end.
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

    // Hvordan finne objektet gameStatus
    gameStatus: game => ({
      ...game.gameStatus,
      drawOffered: game.drawOffered ? game.drawOffered : null
    })
  },

  Query: {
    // Hvordan finne data for et gitt parti
    getGame: (_, { id }, { games }) => {
      const game = games.getGame(id)
      return game ? game : null
    },

    // Hvordan finne antall aktive partier
    getGameCount: (_, __, { games }) => {
      return games.getGames().length
    },

    // Hvordan finne partiene for en gitt bruker
    myGames: (_, __, { games, userId }) => {
      return games.getGames().filter(g => g.whiteId === userId || g.blackId === userId)
    },

    // Hvordan finne alle åpne partier
    openGames: (_, __, { games }) => {
      return games.getGames().filter(g => g.status.includes('waitingFor'))
    }
  },

  Mutation: {
    // Starter et sjakkparti og sender oppdatering om dette til alle tilkoblede WebSockets.
    createGame: (_, { startTime, increment, colour }, { games, userId, pubsub }) => {
      const game = games.createGame({ startTime, increment, colour, userId })
      pubsub.publish('GAME_CREATED', { gameCountUpdated: 1, gameCreated: game })
      return game.id
    },

    // Lar en bruker bli med på et parti og sender oppdatering om dette via WebSocket.
    joinGame: (_, { id }, { games, pubsub, userId }) => {
      const game = games.joinGame(id, userId)
      if (game) {
        pubsub.publish('GAME_JOINED', { gameUpdated: game })
        return true
      } else {
        return false
      }
    },

    // Lar en bruker tilby remis i et gitt parti.
    offerDraw: (_, { id }, { games, pubsub, userId }) => {
      // Kan kun tilby remis i aktive partier.
      const game = games.getGame(id)
      if (!game || game.gameStatus.isFinished || game.status.includes('waitingFor')) {
        return false
      }

      const ids = {
        [game.whiteId]: 'w',
        [game.blackId]: 'b'
      }

      // Kun godta dersom brukeren faktisk deltar i partiet.
      const colour = ids[userId]
      if (!colour) {
        return false
      }

      // Sender kunngjøring om tilbudet via WebSocket.
      game.drawOffered = colour
      pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      return true
    },

    // Lar en bruker godta remis i et gitt parti.
    acceptDraw: (_, { id }, { games, pubsub, userId }) => {
      // Kan kun godta remis i aktive partier.
      const game = games.getGame(id)
      if (!game) {
        return false
      }

      const ids = {
        [game.whiteId]: 'w',
        [game.blackId]: 'b'
      }

      // Kun godta dersom brukeren deltar i partiet, og
      // remis er tilbudt av den andre spilleren i partiet.
      const colour = ids[userId]
      if (!colour || colour === game.drawOffered) {
        return false
      }

      // Avslutter partiet og kunngjør via WebSocket.
      game.drawOffered = false
      game.status = 'finished'
      game.playerDraw()
      pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      return true
    },

    // Lar en bruker gi opp et bestemt parti.
    resign: (_, { id }, { games, pubsub, userId }) => {
      // Kan kun tilby gi opp aktive partier.
      const game = games.getGame(id)
      if (!game || game.gameStatus.isFinished || game.status.includes('waitingFor')) {
        return false
      }

      const ids = {
        [game.whiteId]: 'w',
        [game.blackId]: 'b'
      }

      // Kan kun gi opp dersom man er deltaker i gitt parti.
      const colour = ids[userId]
      if (!colour) {
        return false
      }

      // Avslutter partiet og kunngjør via WebSocket.
      game.drawOffered = false
      game.status = 'finished'
      game.playerResign(colour)
      pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      return true
    }
  },

  // Avgjør hvilke events som skal sende oppdateringer til hvilke klienter via WebSocket.
  Subscription: {
    // Oppdaterer antall partier når partier opprettes.
    gameCountUpdated: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_CREATED'])
    },

    // Oppdaterer partier når noe endres.
    gameUpdated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_UPDATED', 'GAME_JOINED']),
        ({ gameUpdated }, variables) => gameUpdated.id === variables.id
      )
    },

    // Oppdaterer listen over partier når noe skjer i partier brukeren deltar i.
    myGamesUpdated: {
      resolve: (_, __, { userId, games }) =>
        games.getGames().filter(g => g.whiteId === userId || g.blackId === userId),
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_UPDATED', 'GAME_JOINED']),
        (payload, _, { userId }) =>
          payload.gameUpdated.whiteId === userId || payload.gameUpdated.blackId === userId
      )
    },

    // Oppdaterer listen over åpne partier når et parti opprettes og når noen blir med som andre spiller.
    openGamesUpdated: {
      resolve: (_, __, { games }) => games.getGames().filter(g => g.status.includes('waitingFor')),
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['GAME_CREATED', 'GAME_JOINED'])
    }
  }
}
