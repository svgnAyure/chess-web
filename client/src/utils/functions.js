export const formatMoves = legalMoves =>
  legalMoves.reduce(
    (a, m) => {
      const type = m.capture ? 'captures' : 'moves'
      return {
        ...a,
        [type]: { ...a[type], [m.from]: a[type][m.from] ? [...a[type][m.from], m.to] : [m.to] }
      }
    },
    {
      moves: {},
      captures: {}
    }
  )

export const getSquareName = (x, y) => {
  return `${String.fromCharCode(x + 97)}${y + 1}`
}
