const session = require('express-session')
const shortid = require('shortid')

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

const initSession = (req, res, next) => {
  const userId = req.session.userId
  req.session.userId = userId ? userId : shortid.generate()
  next()
}

const getSessionFromWebSocket = (connectionParams, webSocket) =>
  new Promise(resolve =>
    sessionParser(webSocket.upgradeReq, {}, () =>
      resolve({ session: webSocket.upgradeReq.session })
    )
  )

module.exports = {
  sessionParser,
  initSession,
  getSessionFromWebSocket
}
