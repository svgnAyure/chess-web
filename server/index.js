const { GraphQLServer } = require('graphql-yoga')
const { PubSub } = require('graphql-subscriptions')

const { typeDefs, resolvers } = require('./graphql/schema')
const { middlewares } = require('./graphql/middleware')
const { sessionParser, initSession, getSessionFromWebSocket } = require('./session')

const ChessGame = require('../../chess-engine')
const games = {}
const pubsub = new PubSub()

const context = ({ request, connection }) => ({
  userId: request ? request.session.userId : connection.context.session.userId,
  ChessGame,
  games,
  pubsub
})

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares
})

server.express.use(sessionParser, initSession)

server.start({
  port: 4000,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'http://109.247.216.255']
  },
  endpoint: '/graphql',
  subscriptions: {
    path: '/subscriptions',
    onConnect: getSessionFromWebSocket
  }
})
