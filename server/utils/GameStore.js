const shortid = require('shortid')
const ChessGame = require('chess-engine')

class GameStore {
  constructor() {
    this.games = {}
  }

  createGame({ startTime = 5, increment = 2 } = {}) {
    const game = new ChessGame()
    const id = shortid.generate()

    game.id = id
    game.time = {
      startTime,
      increment,
      white: startTime * 60 * 1000,
      black: startTime * 60 * 1000,
      lastMoveTime: null,
      lastMoveBy: null
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
