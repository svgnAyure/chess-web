import { useState, useEffect } from 'react'

export const useTime = ({ whiteTimeLeft, blackTimeLeft, toMove, fullMoves }) => {
  const [whiteTime, setWhiteTime] = useState(whiteTimeLeft)
  const [blackTime, setBlackTime] = useState(blackTimeLeft)
  const runTimers = whiteTime > 0 && blackTime > 0 && fullMoves > 1

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

  return {
    whiteTime: Math.max(whiteTime, 0),
    blackTime: Math.max(blackTime, 0)
  }
}
