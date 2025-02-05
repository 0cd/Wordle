'use client'
import GameOver from '@/components/GameOver'
import Grid from '@/components/Grid'
import useWordle from '@/hooks/useWordle'
import { getTodayWord } from '@/services/wordService'
import { Word } from '@/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const [solution, setSolution] = useState<Word>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { currentGuess, guesses, activeRow, isGameOver, gameState, handleKeydown } = useWordle(solution)

  useEffect(() => {
    getTodayWord().then((word) => {
      if (word) {
        setSolution(word)
        setIsLoading(false)
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown, currentGuess, isGameOver])

  return (
    <div className='h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-mono)]'>
      <div className='flex flex-col items-center mb-12 relative glow'>
        <h1 className='text-5xl font-bold'>WORDLE</h1>
        <span className='text-sm text-zinc-500 absolute -bottom-3' style={{ right: -0.2 }}>
          knockoff
        </span>
      </div>
      {isGameOver && <GameOver gameState={gameState} />}
      {isLoading ? <div>Loading...</div> : <Grid currentGuess={currentGuess} guesses={guesses} activeRow={activeRow} />}
    </div>
  )
}
