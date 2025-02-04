import { useEffect, useState } from 'react'

interface TileProps {
  letter: string
  state: string
}

const Tile = ({ letter, state }: TileProps) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (letter !== ' ') {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 100)
      return () => clearTimeout(timer)
    }
  }, [letter])

  useEffect(() => {
    if (state !== 'empty') {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 100)
      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <div
      className={`
        tile-letter 
        ${state} 
        ${animate ? 'tile-pop' : ''}
        aspect-square 
        border
        border-zinc-700
        rounded-md
        flex 
        items-center 
        justify-center 
        text-2xl 
        font-bold 
        w-14 
        h-14
      `}
    >
      {letter}
    </div>
  )
}

export default Tile
