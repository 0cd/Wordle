'use client'
import GameOver from '@/components/GameOver'
import Grid from '@/components/Grid'
import { getTodayWord, Word } from '@/services/wordService'
import { useEffect, useState } from 'react'

export default function Home() {
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guesses, setGuesses] = useState<string[]>([])
  const [activeRow, setActiveRow] = useState<number>(0)
  const [solution, setSolution] = useState<Word>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    getTodayWord().then((word) => {
      if (word) {
        setSolution(word)
        setIsLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (isGameOver) return

      if (e.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1))
        return
      }

      if (e.key === 'Enter' && currentGuess.length === 5) {
        setGuesses((prev) => {
          const newGuesses = [...prev]
          newGuesses[activeRow] = currentGuess
          return newGuesses
        })

        if (currentGuess === solution?.word.toUpperCase()) {
          setMessage('You win!')
          setIsGameOver(true)
        }

        if (activeRow === 5) {
          setMessage('You lose!')
          setIsGameOver(true)
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

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [currentGuess, activeRow, isGameOver, solution])

  return (
    <div className='h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-mono)]'>
      <div className='flex flex-col items-center mb-12 relative glow'>
        <h1 className='text-5xl font-bold'>WORDLE</h1>
        <span className='text-sm text-zinc-500 absolute -bottom-3' style={{ right: -0.2 }}>
          knockoff
        </span>
      </div>
      {isGameOver && <GameOver message={message} />}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid currentGuess={currentGuess} guesses={guesses} activeRow={activeRow} solution={solution?.word} />
      )}
    </div>
  )
}
