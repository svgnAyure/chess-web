import { useEffect, useRef } from 'react'

export const useScroll = () => {
  const moveListRef = useRef(null)

  useEffect(() => {
    const moveElements = moveListRef.current.children
    const lastMove = moveElements[moveElements.length - 1]
    if (lastMove) {
      lastMove.scrollIntoView({ behavior: 'smooth' })
    }
  })

  return { scrollRef: moveListRef }
}
