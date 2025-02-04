interface GameOverProps {
  message: string
}

const GameOver = ({ message }: GameOverProps) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h1 className='font-bold'>Game Over</h1>
        <p>{message}</p>
        <button className='underline' onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    </div>
  )
}

export default GameOver
