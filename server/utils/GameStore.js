const alphanumeric = require('alphanumeric-id')
const ChessGame = require('chess-engine')

class GameStore {
  constructor() {
    this.games = {}
    setInterval(this.removeUnplayedGames.bind(this), 30000)
  }

  createGame({ startTime, increment, colour, userId }) {
    const game = new ChessGame()
    const id = alphanumeric(8)
    const side = colour === 'random' ? ['white', 'black'][~~(Math.random() * 2)] : colour

    game.id = id
    game.whiteId = side === 'white' ? userId : null
    game.blackId = side === 'black' ? userId : null
    game.status = side === 'white' ? 'waitingForBlack' : 'waitingForWhite'
    game.drawOffered = false
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
    if (!game) {
      return null
    }

    if (game.status === 'waitingForBlack') {
      game.blackId = userId
      game.status = 'ready'
      game.createdAt = Date.now()
      return game
    }

    if (game.status === 'waitingForWhite') {
      game.whiteId = userId
      game.status = 'ready'
      game.createdAt = Date.now()
      return game
    }

    return null
  }

  getGame(gameId) {
    return this.games[gameId]
  }

  getGames() {
    return Object.values(this.games)
  }

  deleteGame(gameId) {
    delete this.games[gameId]
  }

  removeUnplayedGames() {
    const games = { ...this.games }
    Object.values(games).forEach(g => {
      if (g.status.includes('waitingFor') && Date.now() - g.createdAt > 120000) {
        console.log('removing', g.id)
        this.deleteGame(g.id)
      }

      if (g.status === 'ready' && Date.now() - g.createdAt > 120000) {
        console.group('removing', g.id)
        this.deleteGame(g.id)
      }
    })
  }
}

module.exports = GameStore
