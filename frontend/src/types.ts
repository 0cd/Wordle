export type Word = {
  word: string
  definition: string
  id: string
}

export type Tile = {
  letter: string
  state: TileState
}

export type TileState = 'correct' | 'present' | 'absent' | 'empty'
