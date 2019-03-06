module.exports = {
  Query: {
    getMoves: (_, { gameId }, { games }) => {
      const g = games[gameId]
      return g ? g.getMoveHistory() : []
    }
  },

  Mutation: {
    makeMove: (_, { id, from, to, promoteTo }, { games }) => {
      const game = games[id]
      return game.makeMove({ from, to, promoteTo })
    }
  }
}
