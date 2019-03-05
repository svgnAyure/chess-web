const shortid = require('shortid')

module.exports = {
  Game: {
    gameStatus: (game, _, { games }) => {
      const g = games[game.id]
      return g.getGameStatus()
    },

    playerInfo: (game, _, { playerId }) => ({
      myTurn: false,
      isWhite: false
    }),

    keySquares: (game, _, { games }) => {
      const g = games[game.id]
      return g.getKeySquares()
    },

    legalMoves: (game, _, { games }) => {
      const g = games[game.id]
      return g.getLegalMoves()
    },

    moveHistory: (game, _, { games }) => {
      const g = games[game.id]
      return g.getMoveHistory().map(m => m.notation)
    }
  },

  Query: {
    createGame: (_, __, { ChessGame, games }) => {
      const game = new ChessGame()
      game.id = shortid.generate()
      games[game.id] = game
      return {
        id: game.id,
        fen: game.getFen()
      }
    },

    getGame: (_, { id }, { games }) => {
      const game = games[id]
      if (!game) {
        return null
      }
      return {
        id: game.id,
        fen: game.getFen()
      }
    }
  },

  Mutation: {
    makeMove: (_, { id, from, to, promoteTo }, { games }) => {
      const game = games[id]
      return game.makeMove({ from, to, promoteTo })
    }
  }
}
