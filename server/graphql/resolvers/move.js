module.exports = {
  Query: {
    getMoves: (_, { gameId }, { games }) => {
      const game = games.getGame(gameId)
      return game ? game.getMoveHistory() : []
    }
  },

  Mutation: {
    makeMove: (_, { id, from, to, promoteTo }, { games, pubsub }) => {
      const game = games.getGame(id)
      const [, toMove, , , , moveCount] = game.fen.split(' ')
      const move = game.makeMove({ from, to, promoteTo })

      if (move) {
        const colour = toMove === 'w' ? 'white' : 'black'
        const { increment, [colour]: timeLeft, lastMoveTime } = game.time
        const isFirstMove = moveCount === '1'

        game.time = {
          ...game.time,
          [colour]: isFirstMove
            ? timeLeft
            : timeLeft + increment * 1000 - (Date.now() - lastMoveTime),
          lastMoveTime: Date.now(),
          lastMoveBy: toMove
        }

        pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      }

      return move
    }
  }
}
