// React-hook som sørger for å starte og stoppe klokkene for hver
// spiller i sjakkpartiene. Basert på en rekke kriterier vil hooket
// finne ut hvilken spiller som skal ha en aktiv klokke som teller
// ned, og når den eventuelt skal stoppes.

import { useState, useEffect } from 'react'

export const useTime = ({ whiteTimeLeft, blackTimeLeft, isFinished, toMove, fullMoves }) => {
  const [whiteTime, setWhiteTime] = useState(whiteTimeLeft)
  const [blackTime, setBlackTime] = useState(blackTimeLeft)
  const runTimers = whiteTime > 0 && blackTime > 0 && fullMoves > 1 && !isFinished

  useEffect(() => {
    setWhiteTime(Number(whiteTimeLeft))
    setBlackTime(Number(blackTimeLeft))
  }, [whiteTimeLeft, blackTimeLeft])

  useEffect(() => {
    if (toMove === 'w' && runTimers) {
      const interval = setInterval(() => setWhiteTime(t => t - 1000), 1000)
      return () => clearInterval(interval)
    }

    if (toMove === 'b' && runTimers) {
      const interval = setInterval(() => setBlackTime(t => t - 1000), 1000)
      return () => clearInterval(interval)
    }
  }, [whiteTimeLeft, blackTimeLeft, runTimers])

  const netWhiteTime = Math.max(whiteTime, 0)
  const netBlackTime = Math.max(blackTime, 0)

  return {
    whiteTime: netWhiteTime,
    blackTime: netBlackTime
  }
}
