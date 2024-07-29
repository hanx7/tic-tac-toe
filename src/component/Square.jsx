import { useState, useEffect } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(' '));
  const [isX, setIsX] = useState(true);
  const [status, setStatus] = useState(null);

  const handleClick = (i) => {
    if (squares[i] !== ' ' || status) return; // Prevent clicking on already filled squares or after a win
    const newSquares = squares.slice(); // Create a copy of the squares array
    newSquares[i] = isX ? 'X' : 'O';
    setSquares(newSquares);
    setIsX(!isX);
  };

  const handleRestart = () => {
    setIsX(true);
    setSquares(Array(9).fill(' ')); // Fill with spaces, not empty strings
    setStatus(null);
  }

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (!squares.includes(' ')) {
      setStatus("It's a draw!");
    }
  }, [squares]);

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (squares[a] !== ' ' && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const renderSquare = (i)=>{
    return(
      <Square value={squares[i]} onClick={() => handleClick(i)} />
    );
  }

  return (
    <div className="board-container">
      <div className="board">
        <div className="title">Welcome to tic-tac-toe game!</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div className="status">{status}</div>
        <div className="restart" onClick={handleRestart}>Restart game!</div>
      </div>
    </div>
  );
}
