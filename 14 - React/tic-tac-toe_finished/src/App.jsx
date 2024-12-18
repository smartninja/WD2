import { useState } from 'react'
import './App.css';


function Square({ value, clickHandler }) {

  return (
    <button
      className="square"
      onClick={clickHandler}
    >
      {value}
    </button>
  )
}

function App() {

  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const [statusRow, setStatusRow] = useState('X is next');
  const [isGameFinished, setIsGameFinished] = useState(false);

  function handleClick(id) {
    if (gameState[id] || isGameFinished) {
      console.warn('This move is not allowed!');
      return;
    }
    let newGameState = [...gameState];
    newGameState[id] = xIsNext ? 'X' : 'O';
    setStatusRow(!xIsNext ? 'X is next' : 'O is next');
    setXIsNext(!xIsNext);


    setGameState(newGameState);
    const winner = calculateWinner(newGameState);
    if(winner!== null){
      setStatusRow(winner + ' won the game!');
      setIsGameFinished(true);
    }

  }

  function calculateWinner(gameState) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        // winner found
        return gameState[a]
      }
    }
    if (gameState.indexOf('') === -1) {
      return 'No one'
    }
    return null;
  }

  // jsx
  return (
    <>
    <p>{statusRow}</p>
      <div className="board-row">
        <Square value={gameState[0]} clickHandler={() => handleClick(0)} />
        <Square value={gameState[1]} clickHandler={() => handleClick(1)} />
        <Square value={gameState[2]} clickHandler={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={gameState[3]} clickHandler={() => handleClick(3)} />
        <Square value={gameState[4]} clickHandler={() => handleClick(4)} />
        <Square value={gameState[5]} clickHandler={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={gameState[6]} clickHandler={() => handleClick(6)} />
        <Square value={gameState[7]} clickHandler={() => handleClick(7)} />
        <Square value={gameState[8]} clickHandler={() => handleClick(8)} />
      </div>
    </>
  );
}

export default App;
