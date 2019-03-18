module.exports = {
  Query: {
    getMoves: (_, { gameId }, { games }) => {
      const g = games[gameId]
      return g ? g.getMoveHistory() : []
    }
  },

  Mutation: {
    makeMove: (_, { id, from, to, promoteTo }, { games, pubsub }) => {
      const game = games[id]
      const move = game.makeMove({ from, to, promoteTo })

      if (move) {
        pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      }

      return move
    }
  }
}
