import Tile from './Tile'
import { Tile as TileType } from '@/types'

interface RowProps {
  guess: TileType[]
}

const Row = ({ guess }: RowProps) => {
  return (
    <div role='row' className='row grid grid-cols-5' style={{ width: '300px' }}>
      {guess.map((tile, index) => (
        <Tile key={index} letter={tile.letter} state={tile.state} />
      ))}
    </div>
  )
}

export default Row
