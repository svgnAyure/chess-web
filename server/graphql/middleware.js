const middlewares = {
  Mutation: {
    makeMove: (resolve, parent, { from, to, id }, { userId }) => {
      console.log(`User '${userId}' moving from ${from} to ${to} in game '${id}'.`)
      return resolve()
    }
  }
}

const test = (resolve, parent, ctx, info) => {
  console.log('success')
  return resolve()
}

module.exports = [test, middlewares]
