const alphanumeric = require('alphanumeric-id')
const ChessGame = require('chess-engine')

class GameStore {
  constructor() {
    this.games = {}
  }

  createGame({ startTime, increment, colour, userId } = {}) {
    const game = new ChessGame()
    const id = alphanumeric(8)
    const side = colour === 'random' ? ['white', 'black'][~~(Math.random() * 2)] : colour

    game.id = id
    game.whiteId = side === 'white' ? userId : null
    game.blackId = side === 'black' ? userId : null
    game.status = side === 'white' ? 'waitingForBlack' : 'waitingForWhite'
    game.createdAt = Date.now()

    game.time = {
      startTime,
      increment,
      white: startTime * 60 * 1000,
      black: startTime * 60 * 1000,
      lastMoveTime: null,
      lastMoveBy: null,
      timeoutId: null
    }

    this.games[id] = game
    return game
  }

  joinGame(gameId, userId) {
    const game = this.games[gameId]

    if (game.status === 'waitingForBlack') {
      game.blackId = userId
      game.status = 'ready'
      return game
    }

    if (game.status === 'waitingForWhite') {
      game.whiteId = userId
      game.status = 'ready'
      return game
    }

    return null
  }

  getGame(gameId) {
    return this.games[gameId]
  }

  deleteGame(gameId) {
    delete this.games[gameId]
  }
}

module.exports = GameStore
