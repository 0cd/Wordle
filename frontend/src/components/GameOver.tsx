interface GameOverProps {
  gameState: number
}

const GameOver = ({ gameState }: GameOverProps) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h1 className='font-bold'>Game Over</h1>
        {gameState === 1 ? <p>You win!</p> : gameState === 2 ? <p>You lose!</p> : null}
        <button className='underline' onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    </div>
  )
}

export default GameOver
