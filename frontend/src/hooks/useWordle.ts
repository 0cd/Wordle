import { useState } from 'react'
import { Word, Tile } from '@/types'
import { formatGuess } from '@/utils'

// creates an empty 5x6 grid
const createInitialGuesses = (): Tile[][] =>
  Array.from({ length: 6 }, () => Array(5).fill({ letter: '', state: 'empty' }))

const useWordle = (solution?: Word) => {
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guesses, setGuesses] = useState<Tile[][]>(createInitialGuesses)
  const [activeRow, setActiveRow] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [gameState, setGameState] = useState<number>(0) // 0: playing, 1: win, 2: lose

  const getTileState = () => {
    if (!solution || activeRow >= guesses.length) return

    const formattedGuess = formatGuess(currentGuess)
    const solutionArray = solution?.word.toUpperCase().split('')
    const solutionLetterCounts: Record<string, number> = {}

    // count occurrence of each letter in solution
    solutionArray.forEach((char) => {
      solutionLetterCounts[char] = (solutionLetterCounts[char] || 0) + 1
    })

    // mark correct tiles
    formattedGuess.forEach((tile, index) => {
      if (tile.letter === solutionArray[index]) {
        tile.state = 'correct'
        solutionLetterCounts[tile.letter]!--
      }
    })

    // mark present and absent tiles
    formattedGuess.forEach((tile) => {
      if (tile.state === 'correct') return

      if (solutionLetterCounts[tile.letter]) {
        tile.state = 'present'
        solutionLetterCounts[tile.letter]!--
      } else {
        tile.state = 'absent'
      }
    })

    setGuesses((prev) => {
      const newGuesses = [...prev]
      newGuesses[activeRow] = formattedGuess
      return newGuesses
    })
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (gameState === 1 || gameState === 2) return

    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return

    if (e.key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }

    if (e.key === 'Enter' && currentGuess.length === 5) {
      getTileState()

      if (currentGuess === solution?.word.toUpperCase()) {
        setGameState(1)
        setShowModal(true)
      }

      if (activeRow === 5 && currentGuess !== solution?.word.toUpperCase()) {
        setGameState(2)
        setShowModal(true)
      }

      setActiveRow((prev) => prev + 1)
      setCurrentGuess('')
      return
    }

    if (currentGuess.length >= 5) return

    const key = e.key.toUpperCase()
    if (/^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => prev + key)
    }
  }

  return { currentGuess, guesses, activeRow, showModal, setShowModal, gameState, handleKeydown }
}

export default useWordle
