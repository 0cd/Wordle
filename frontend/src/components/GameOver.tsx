import { Word } from '@/types'

interface GameOverProps {
  gameState: number
  solution?: Word
  closeModal: () => void
}

const GameOver = ({ gameState, solution, closeModal }: GameOverProps) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='relative'>
          <p className='font-bold text-center'>{gameState === 1 ? 'You won!' : gameState === 2 ? 'You lost!' : null}</p>
          <button className='absolute top-0 right-0' onClick={closeModal}>
            <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z'
                  fill='#FFFFFF'
                ></path>{' '}
              </g>
            </svg>
          </button>
        </div>
        <hr className='h-px my-4 bg-zinc-700 border-0' />

        {solution && (
          <div className='mb-4 text-center'>
            <p className='mb-1 text-lg'>The correct word was:</p>
            <p className='mb-2'>
              <span className='text-3xl font-bold glow'>{solution.word.toUpperCase()}</span>
            </p>
            <p className='text-zinc-400 text-base'>{solution.definition}</p>
          </div>
        )}
        <hr className='h-px my-4 bg-zinc-700 border-0' />
        <div className='flex gap-2 justify-center'>
          <button
            className='bg-transparent hover:bg-zinc-800 border border-zinc-700 font-bold py-2 px-4 rounded'
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className='bg-transparent hover:bg-zinc-800 border border-zinc-700 font-bold py-2 px-4 rounded'
            onClick={() => window.location.reload()}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver
