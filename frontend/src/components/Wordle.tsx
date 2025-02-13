import GameOver from '@/components/GameOver'
import Grid from '@/components/Grid'
import useWordle from '@/hooks/useWordle'
import { Word } from '@/types'
import { useEffect } from 'react'

interface WordleProps {
  solution?: Word
  isLoading: boolean
}

const Wordle = ({ solution, isLoading }: WordleProps) => {
  const { currentGuess, guesses, activeRow, showModal, setShowModal, gameState, handleKeydown } = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown])

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-mono)]'>
      <div className='flex flex-col items-center mb-12 relative glow'>
        <h1 className='text-5xl font-bold'>WORDLE</h1>
        <span className='text-sm text-zinc-500 absolute -bottom-3' style={{ right: -0.2 }}>
          knockoff
        </span>
      </div>
      {showModal && <GameOver gameState={gameState} solution={solution} closeModal={closeModal} />}
      {isLoading ? <div>Loading...</div> : <Grid currentGuess={currentGuess} guesses={guesses} activeRow={activeRow} />}
    </div>
  )
}

export default Wordle
