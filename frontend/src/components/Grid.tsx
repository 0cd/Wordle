import Row from './Row'
import { Tile as TileType } from '@/types'

interface GridProps {
  currentGuess: string
  guesses: TileType[][]
  activeRow: number
}

const Grid = ({ currentGuess, guesses, activeRow }: GridProps) => {
  return (
    <div role='grid' className='grid gap-1' style={{ height: '360px' }}>
      {guesses.map((guess, index) => (
        <Row
          key={index}
          guess={
            index === activeRow
              ? currentGuess
                  .padEnd(5, ' ')
                  .split('')
                  .map((letter) => ({ letter, state: 'empty' }))
              : guess
          }
        />
      ))}
    </div>
  )
}

export default Grid
