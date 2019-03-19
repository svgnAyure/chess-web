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

export const parseTime = ms => {
  const totalSeconds = (ms / 1000).toFixed(0)
  const minutes = `${~~(totalSeconds / 60)}`.padStart(2, '0')
  const seconds = `${totalSeconds % 60}`.padStart(2, '0')
  return `${minutes}:${seconds}`
}
