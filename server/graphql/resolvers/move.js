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
      if (!game) {
        return false
      }

      const move = game.makeMove({ from, to, promoteTo })
      if (move) {
        const halfMoves = game.moveHistory.length
        const shouldCostTime = halfMoves > 2
        const shouldStartTimeout = halfMoves >= 2 && !game.gameStatus.isFinished

        const nextMoveColour = game.fen.split(' ')[1] === 'w' ? 'white' : 'black'
        const prevMoveColour = nextMoveColour === 'white' ? 'black' : 'white'

        const { increment, lastMoveTime, timeoutId, ...rest } = game.time
        const { [prevMoveColour]: oldTimeLeft, [nextMoveColour]: otherTimeLeft } = rest
        const newTimeLeft = oldTimeLeft + increment * 1000 - (Date.now() - lastMoveTime)

        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        const onTimeout = () => {
          game.playerTimeout(nextMoveColour[0])
          game.status = 'finished'
          pubsub.publish('GAME_UPDATED', { gameUpdated: game })
        }

        game.status = game.gameStatus.isFinished
          ? 'finished'
          : halfMoves > 1
          ? 'inProgress'
          : 'ready'

        game.drawOffered = false
        game.time = {
          ...game.time,
          [prevMoveColour]: shouldCostTime ? newTimeLeft : oldTimeLeft,
          lastMoveTime: Date.now(),
          lastMoveBy: prevMoveColour[0],
          timeoutId: shouldStartTimeout ? setTimeout(onTimeout, otherTimeLeft) : null
        }

        pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      }

      return move
    }
  }
}
