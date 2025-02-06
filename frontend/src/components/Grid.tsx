import Row from './Row'
import { Tile as TileType } from '@/types'
import { formatGuess } from '@/utils'

interface GridProps {
  currentGuess: string
  guesses: TileType[][]
  activeRow: number
}

const Grid = ({ currentGuess, guesses, activeRow }: GridProps) => {
  return (
    <div role='grid' className='flex flex-col gap-1 h-360'>
      {guesses.map((guess, index) => (
        <Row key={index} guess={index === activeRow ? formatGuess(currentGuess) : guess} />
      ))}
    </div>
  )
}

export default Grid
