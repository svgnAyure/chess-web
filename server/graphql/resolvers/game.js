const shortid = require('shortid')

module.exports = {
  Query: {
    createGame: (_, __, { ChessGame, games }) => {
      const game = new ChessGame()
      game.id = shortid.generate()
      games[game.id] = game
      return {
        id: game.id,
        fen: game.getFen(),
        toMove: game.toMove,
        legalMoves: game.getLegalMoves()
      }
    },

    getGame: (_, { id }, { games }) => {
      const game = games[id]
      if (!game) {
        return null
      }
      return {
        id: game.id,
        fen: game.getFen(),
        toMove: game.toMove,
        lastMove: [],
        inCheck: null,
        legalMoves: game.getLegalMoves()
      }
    }
  },

  Mutation: {
    makeMove: (_, { id, from, to, promoteTo }, { games }) => {
      const game = games[id]
      game.makeMove({ from, to, promoteTo })
      return {
        id: game.id,
        fen: game.getFen(),
        toMove: game.toMove,
        legalMoves: game.getLegalMoves()
      }
    }
  }
}
