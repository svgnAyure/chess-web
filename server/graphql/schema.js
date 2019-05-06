// Modul som samler data om GraphQL-strukturen fra flere filer
// og kombinerer dem slik at det kan brukes av serveren.

const path = require('path')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

const typeDefs = fileLoader(path.join(__dirname, './typeDefs'))
const resolvers = fileLoader(path.join(__dirname, './resolvers'))

module.exports = {
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers)
}
