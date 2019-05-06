// Klasse for lagring og behandling av sjakkpartier på serveren.

// Importsetninger
const alphanumeric = require('alphanumeric-id')
const ChessGame = require('chess-engine')

class GameStore {
  // Konstruktørmetode
  constructor() {
    this.games = {} // Listen over alle partier
    setInterval(this.removeExpiredGames.bind(this), 30000) // Rydder opp hvert 30. sekund
  }

  // Metode for oppretting av partier.
  createGame({ startTime, increment, colour, userId }) {
    // Oppretter partiet og gir det en tilfeldig generert ID.
    // Bestemmer farge for spilleren som oppretter partiet.
    const game = new ChessGame()
    const id = alphanumeric(8)
    const side = colour === 'random' ? ['white', 'black'][~~(Math.random() * 2)] : colour

    // Generell data som legges til partiobjektet.
    game.id = id
    game.whiteId = side === 'white' ? userId : null
    game.blackId = side === 'black' ? userId : null
    game.status = side === 'white' ? 'waitingForBlack' : 'waitingForWhite'
    game.drawOffered = false
    game.createdAt = Date.now()

    // Data som omhandler tidskontrollen for partiet.
    // Vil også inneholde info om tiden som er igjen for hver spiller.
    game.time = {
      startTime,
      increment,
      white: startTime * 60 * 1000,
      black: startTime * 60 * 1000,
      lastMoveTime: null,
      lastMoveBy: null,
      timeoutId: null
    }

    // Legger til partiet i listen og returnerer.
    this.games[id] = game
    return game
  }

  // Metode som legger til en motstander i et eksisterende parti.
  joinGame(gameId, userId) {
    const game = this.games[gameId]
    if (!game) {
      return null
    }

    // Dersom partiet mangler svart - legg brukeren inn som svart.
    if (game.status === 'waitingForBlack') {
      game.blackId = userId
      game.status = 'ready'
      game.createdAt = Date.now()
      return game
    }

    // Dersom partiet mangler hvit - legg brukeren inn som hvit.
    if (game.status === 'waitingForWhite') {
      game.whiteId = userId
      game.status = 'ready'
      game.createdAt = Date.now()
      return game
    }

    // Returner null dersom noe gikk galt.
    return null
  }

  // Getter for partier basert på ID.
  getGame(gameId) {
    return this.games[gameId]
  }

  // Getter for alle partier.
  getGames() {
    return Object.values(this.games)
  }

  // Metode for fjerning av partier i listen.
  deleteGame(gameId) {
    delete this.games[gameId]
  }

  // Metode som sørger for å fjerne partier som av ulike årsaker er inaktive.
  removeExpiredGames() {
    const games = { ...this.games }

    // Løper gjennom alle partier i listen.
    Object.values(games).forEach(g => {
      // Dersom partiet ikke har 2 spillere innen 2 minutter, slett partiet.
      if (g.status.includes('waitingFor') && Date.now() - g.createdAt > 120000) {
        this.deleteGame(g.id)
      }

      // Begge spillere har 2 minutter på seg til å gjøre sitt første trekk.
      if (g.status === 'ready' && Date.now() - g.createdAt > 120000) {
        this.deleteGame(g.id)
      }

      // Dersom et parti er ferdigspilt, slett det etter 5 minutter.
      if (g.status === 'finished' && Date.now() - g.createdAt > 300000) {
        this.deleteGame(g.id)
      }
    })
  }
}

module.exports = GameStore
