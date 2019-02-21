let id = 1

module.exports = {
  Query: {
    createGame: (_, __, { ChessGame, games }) => {
      const game = new ChessGame()
      game.id = id
      games[id++] = game
      return { id: game.id, fen: game.getFen(), toMove: game.toMove }
    },

    getGame: (_, { id }, { games }) => {
      const game = games[id]
      if (!game) {
        return null
      }
      return { id: game.id, fen: game.getFen(), toMove: game.toMove }
    }
  }
}
