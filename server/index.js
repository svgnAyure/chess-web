// Hovedkomponenten for webserveren.

// Importsetninger
const { GraphQLServer } = require('graphql-yoga')
const { PubSub } = require('graphql-subscriptions')

const { typeDefs, resolvers } = require('./graphql/schema')
const { sessionParser, initSession, getSessionFromWebSocket } = require('./session')
const ChessStore = require('./utils/GameStore')

const SERVER_URL = process.env.SERVER_URL || 'localhost:3000'

// Oppretter instans av klassen for lagring av partier.
const games = new ChessStore()
const pubsub = new PubSub()

// Tilgjengeliggjør session-data, partilisten og modul for
// sending av sanntidsdata for resolverne i GraphQL-oppsettet.
const context = ({ request, connection }) => ({
  userId: request ? request.session.userId : connection.context.session.userId,
  games,
  pubsub
})

// Oppretter en GraphQL-server og konfigurerer denne.
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
})

// Legger inn sessionrelatert middleware.
server.express.use(sessionParser, initSession)

// Konfigurerer og starter serveren.
server.start({
  port: 4000,
  cors: {
    credentials: true,
    origin: [`http://${SERVER_URL}`]
  },
  endpoint: '/graphql',
  subscriptions: {
    path: '/subscriptions',
    onConnect: getSessionFromWebSocket
  }
})
