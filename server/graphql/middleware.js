const middlewares = {
  Mutation: {
    makeMove: (resolve, parent, { from, to, id }, { userId }) => {
      console.log(`User '${userId}' moving from ${from} to ${to} in game '${id}'.`)
      return resolve()
    }
  }
}

module.exports = {
  middlewares
}
