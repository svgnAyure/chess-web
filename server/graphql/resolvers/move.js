// Modul som inneholder resolver-funksjoner for GraphQL-serveren.
// Disse funksjonene definerer hvordan GraphQL skal hente nødvendig
// data både fra eksterne kilder og fra andre objekter.

module.exports = {
  Query: {
    // Hvordan finne data for trekkhistorikken i et gitt parti
    getMoves: (_, { gameId }, { games }) => {
      const game = games.getGame(gameId)
      return game ? game.getMoveHistory() : []
    }
  },

  Mutation: {
    // Utfører et trekk i et gitt parti.
    makeMove: (_, { id, from, to, promoteTo }, { games, pubsub }) => {
      // Forkast forespørselen dersom partiet ikke finnes.
      const game = games.getGame(id)
      if (!game) {
        return false
      }

      // Prøver å utføre trekket.
      const move = game.makeMove({ from, to, promoteTo })
      if (move) {
        // Spillernes tid skal kun begynne å gå nedover etter at begge har gjort ett trekk.
        const halfMoves = game.moveHistory.length
        const shouldCostTime = halfMoves > 2
        const shouldStartTimeout = halfMoves >= 2 && !game.gameStatus.isFinished

        const nextMoveColour = game.fen.split(' ')[1] === 'w' ? 'white' : 'black'
        const prevMoveColour = nextMoveColour === 'white' ? 'black' : 'white'

        // Regn ut ny tid for spilleren som gjorde trekket.
        const { increment, lastMoveTime, timeoutId, ...rest } = game.time
        const { [prevMoveColour]: oldTimeLeft, [nextMoveColour]: otherTimeLeft } = rest
        const newTimeLeft = oldTimeLeft + increment * 1000 - (Date.now() - lastMoveTime)

        // Avslutt eventuelle timere som kjører.
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        // En funksjon som utføres når en spillers tid går ut.
        // Spillet vil avsluttes og resultatet følger reglene
        // for dette definert i sjakkmotoren.
        const onTimeout = () => {
          game.playerTimeout(nextMoveColour[0])
          game.status = 'finished'
          pubsub.publish('GAME_UPDATED', { gameUpdated: game })
        }

        // Setter riktig status basert på trekkets resultat.
        game.status = game.gameStatus.isFinished
          ? 'finished'
          : halfMoves > 1
          ? 'inProgress'
          : 'ready'

        // Fjerner eventuelle tilbud om remis. Altså vil man avslå remis ved å gjøre et trekk.
        game.drawOffered = false

        // Setter nye variabler for tid i partiet, og starter timeren for neste spiller.
        game.time = {
          ...game.time,
          [prevMoveColour]: shouldCostTime ? newTimeLeft : oldTimeLeft,
          lastMoveTime: Date.now(),
          lastMoveBy: prevMoveColour[0],
          timeoutId: shouldStartTimeout ? setTimeout(onTimeout, otherTimeLeft) : null
        }

        // Publiserer partiet via WebSocket med nye data etter trekket.
        pubsub.publish('GAME_UPDATED', { gameUpdated: game })
      }

      return move
    }
  }
}
