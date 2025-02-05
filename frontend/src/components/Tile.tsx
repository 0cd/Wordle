import { useEffect, useState } from 'react'

interface TileProps {
  letter: string
  state: string
}

const Tile = ({ letter, state }: TileProps) => {
  const [pop, setPop] = useState(false)

  useEffect(() => {
    if (letter !== '' && letter !== ' ') {
      setPop(true)
      setTimeout(() => setPop(false), 100)
    }
  }, [letter])

  return (
    <div role='tile' className={`tile ${state} ${pop ? 'tile-pop' : ''}`}>
      {letter}
    </div>
  )
}

export default Tile
