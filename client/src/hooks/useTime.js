import { useState, useEffect } from 'react'

export const useTime = (a, toMove) => {
  const [whiteTime, setWhiteTime] = useState(a)
  const [blackTime, setBlackTime] = useState(a)

  useEffect(() => {
    if (toMove === 'w') {
      const timer = setInterval(() => setWhiteTime(whiteTime + 1), 1000)
      return () => clearInterval(timer)
    }

    if (toMove === 'b') {
      const timer = setInterval(() => setBlackTime(blackTime + 1), 1000)
      return () => clearInterval(timer)
    }
  })

  return { whiteTime, blackTime }
}
