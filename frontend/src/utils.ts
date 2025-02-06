import { Tile } from '@/types'

export const formatGuess = (currentGuess: string): Tile[] => {
  return currentGuess
    .padEnd(5, ' ')
    .split('')
    .map((letter) => ({ letter, state: 'empty' }))
}
