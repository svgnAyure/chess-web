const { GraphQLServer } = require('graphql-yoga')

const { typeDefs, resolvers } = require('./graphql/schema')
const { middlewares } = require('./graphql/middleware')
const { sessionParser, initSession } = require('./session')

const ChessGame = require('../../chess-engine')
const games = {}

const context = ({ request }) => ({
  userId: request.session.userId,
  ChessGame,
  games
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
    origin: ['http://localhost:3000']
  },
  endpoint: '/graphql',
  subscriptions: '/subscriptions'
})
