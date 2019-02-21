const path = require('path')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

const typeDefs = fileLoader(path.join(__dirname, './typeDefs'))
const resolvers = fileLoader(path.join(__dirname, './resolvers'))

module.exports = {
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers)
}
