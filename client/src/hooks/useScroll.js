// React-hook som lagrer en referanse til trekkhistorikklisten.
// Etter hvert trekk vil dette hooket sørge for at denne listen
// alltid er scrollet ned til siste trekk.

import { useEffect, useRef } from 'react'

export const useScroll = fen => {
  const moveListRef = useRef(null)

  useEffect(() => {
    const moveElements = moveListRef.current.children
    const lastMove = moveElements[moveElements.length - 1]
    if (lastMove) {
      lastMove.scrollIntoView({ behavior: 'smooth' })
    }
  }, [fen])

  return { scrollRef: moveListRef }
}
