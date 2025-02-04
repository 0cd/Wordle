import { useMemo } from 'react'
import Tile from './Tile'

type TileState = 'correct' | 'present' | 'absent' | 'empty'

interface GridProps {
  currentGuess: string
  guesses: string[]
  activeRow: number
  solution?: string
}

const Grid = ({ currentGuess, guesses, activeRow, solution }: GridProps) => {
  const solutionArray = solution?.toUpperCase().split('')

  const getTileState = (letter: string, rowIndex: number, colIndex: number): TileState => {
    if (rowIndex >= activeRow) return 'empty'
    if (!solutionArray) return 'empty'

    const guessArray = guesses[rowIndex].split('')
    const solutionLetterCounts: Record<string, number> = {}

    solutionArray.forEach((char) => {
      solutionLetterCounts[char] = (solutionLetterCounts[char] || 0) + 1
    })

    const result: TileState[] = Array(5).fill('absent')

    guessArray.forEach((char, index) => {
      if (char === solutionArray[index]) {
        result[index] = 'correct'
        solutionLetterCounts[char]!--
      }
    })

    guessArray.forEach((char, index) => {
      if (result[index] === 'correct') return
      if (solutionLetterCounts[char]) {
        result[index] = 'present'
        solutionLetterCounts[char]!--
      }
    })

    return result[colIndex]
  }

  const rows = useMemo(
    () =>
      Array.from({ length: 6 }, (_, rowIndex) =>
        rowIndex < activeRow
          ? guesses[rowIndex].split('')
          : rowIndex === activeRow
          ? currentGuess.padEnd(5, ' ').split('')
          : Array(5).fill(' ')
      ),
    [currentGuess, guesses, activeRow]
  )

  return (
    <div role='grid' aria-label='Wordle Grid' className='flex justify-center items-center'>
      <div className='grid grid-cols-5' style={{ width: '300px', height: '360px' }}>
        {rows.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} letter={letter} state={getTileState(letter, rowIndex, colIndex)} />
          ))
        )}
      </div>
    </div>
  )
}

export default Grid
