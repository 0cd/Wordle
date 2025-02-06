import Tile from './Tile'
import { Tile as TileType } from '@/types'

interface RowProps {
  guess: TileType[]
}

const Row = ({ guess }: RowProps) => {
  return (
    <div role='row' className='row flex flex-row gap-1 w-300'>
      {guess.map((tile, index) => (
        <Tile key={index} letter={tile.letter} state={tile.state} />
      ))}
    </div>
  )
}

export default Row
