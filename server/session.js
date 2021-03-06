// Modul for oppsett og behandling av sessions.

// Importsetninger
const session = require('express-session')
const alphanumeric = require('alphanumeric-id')

// Express-middleware for parsering av cookies i innkommende forespørsler.
const sessionParser = session({
  name: 's',
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
})

// Express-middleware som knytter en tilfeldig generert bruker-ID
// til nye brukere av applikasjonen. Eksisterende brukere beholder sin ID.
const initSession = (req, res, next) => {
  const userId = req.session.userId
  req.session.userId = userId ? userId : alphanumeric(8)
  next()
}

// Funksjon som henter HTTP-data fra forespørselen som førte til
// oppkobling av WebSocket-tilkobling og henter session cookie fra denne.
const getSessionFromWebSocket = async (connectionParams, webSocket) =>
  await new Promise((resolve, reject) => {
    sessionParser(webSocket.upgradeReq, {}, () => {
      const session = webSocket.upgradeReq.session
      if (session.userId) {
        resolve({ session })
      } else {
        reject('no userId')
      }
    })
  }).catch(e => {
    throw new Error(e)
  })

module.exports = {
  sessionParser,
  initSession,
  getSessionFromWebSocket
}
