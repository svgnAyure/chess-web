const { GraphQLServer } = require('graphql-yoga')

const { typeDefs, resolvers } = require('./graphql/schema')
const { middlewares } = require('./graphql/middleware')

const ChessGame = require('../../chess-engine')
const games = {}

const context = ({ request, response }) => ({
  req: request,
  res: response,
  ChessGame,
  games
})

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares
})

server.start({
  endpoint: '/graphql',
  subscriptions: '/subscriptions'
})
