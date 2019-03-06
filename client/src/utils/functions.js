export const formatMoves = legalMoves =>
  legalMoves.reduce(
    (a, m) => ({
      moves:
        !m.capture || m.special === 'enPassant'
          ? a.moves[m.from]
            ? { ...a.moves, [m.from]: [...a.moves[m.from], m.to] }
            : { ...a.moves, [m.from]: [m.to] }
          : a.moves,
      captures:
        m.capture && m.special !== 'enPassant'
          ? a.captures[m.from]
            ? { ...a.captures, [m.from]: [...a.captures[m.from], m.to] }
            : { ...a.captures, [m.from]: [m.to] }
          : a.captures,
      promotions:
        m.special === 'promotion'
          ? a.promotions[m.from]
            ? { ...a.promotions, [m.from]: [...a.promotions[m.from], m.to] }
            : { ...a.promotions, [m.from]: [m.to] }
          : a.promotions
    }),
    {
      moves: {},
      captures: {},
      promotions: {}
    }
  )

export const getSquareName = (x, y) => {
  return `${String.fromCharCode(x + 97)}${y + 1}`
}
