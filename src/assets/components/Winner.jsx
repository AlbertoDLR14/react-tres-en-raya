import { Square } from "./Square";
import { FiRefreshCw } from "react-icons/fi";

export function Winner({ winner, resetGame }) {
  if (winner === null) return null;
  const winnerText = winner === false ? "Empate" : "Ganó";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button className="reloadGame" onClick={resetGame}>
            <FiRefreshCw />
          </button>
        </footer>
      </div>
    </section>
  );
}
