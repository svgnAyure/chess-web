const shortid = require('shortid')
const ChessGame = require('../../chess-engine')

class GameStore {
  constructor() {
    this.games = {}
  }

  createGame({ whiteId, blackId }) {
    const game = new ChessGame()
    const gameId = shortid.generate()

    game.id = gameId
    game.whiteId = whiteId
    game.blackId = blackId

    this.games[gameId] = game
  }

  getGame(gameId) {
    return this.games[gameId]
  }

  deleteGame(gameId) {
    delete this.games[gameId]
  }
}

module.exports = GameStore
