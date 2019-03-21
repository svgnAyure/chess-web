const shortid = require('shortid')
const ChessGame = require('chess-engine')

class GameStore {
  constructor() {
    this.games = {}
  }

  createGame({ startTime, increment, colour, userId } = {}) {
    const game = new ChessGame()
    const id = shortid.generate()
    const side = colour === 'random' ? ['white', 'black'][~~(Math.random() * 2)] : colour

    game.id = id
    game.whiteId = side === 'white' ? userId : null
    game.blackId = side === 'black' ? userId : null
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

  getGame(gameId) {
    return this.games[gameId]
  }

  deleteGame(gameId) {
    delete this.games[gameId]
  }
}

module.exports = GameStore
