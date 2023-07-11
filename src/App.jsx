import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./assets/components/Square";
import { TURNS } from "./assets/logica/constant";
import { checkWinner, checkEndGame } from "./assets/logica/board";
import { Winner } from "./assets/components/Winner";
import { FiRefreshCw } from "react-icons/fi";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({
    x: 0,
    o: 0,
    empates: 0,
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const updateBoard = (index) => {
    //si la posición clicada tiene un valor no hacer nada
    if (board[index] || winner) return;

    const newBoard = [...board];

    // Actualizar tablero
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambiar Turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //revisar ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);

      if (newWinner === TURNS.X) {
        setScore((prevScore) => ({ ...prevScore, x: prevScore.x + 1 }));
      } else if (newWinner === TURNS.O) {
        setScore((prevScore) => ({ ...prevScore, o: prevScore.o + 1 }));
      }
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      setScore((prevScore) => ({
        ...prevScore,
        empates: prevScore.empates + 1,
      }));
    }
  };

  return (
    <main className="board">
      <section className="menu">
        <div className="turn">
          <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
        </div>
        <h1>Tres en raya</h1>
        <button className="reloadGame" onClick={resetGame}>
          <FiRefreshCw />
        </button>
      </section>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <Winner winner={winner} resetGame={resetGame} />

      <div className="historial">
        <p>
          Jugador × <span>{score.x}</span>
        </p>
        <p>
          Empates <span>{score.empates}</span>
        </p>
        <p>
          Jugador o <span>{score.o} </span>
        </p>
      </div>
    </main>
  );
}

export default App;
