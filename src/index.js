import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Css from "./index.css";

const alpplication = document.getElementById("root");
const root = createRoot(alpplication);

// Square Component
const Square = (props) => {
  return (
    <button className="square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

// Board Component
const Board = () => {
  // initialisation de l'état par un tableau de 9 valeurs = null
  const initialeSquares = Array(9).fill(null);
  // initialisation du status du chaques éléments dans le tableau précédent
  const [squares, setSquares] = useState(initialeSquares);
  console.log(useState(initialeSquares));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    // copie de l'état du tableau initialSquares
    const newSquares = [...squares];

    // on vérifie si on a un gagnant
    const winnerDeclared = Boolean(calculateWinner(newSquares));

    // et ce que nous renvoi le tableau en fonction de l'évènement
    const squareFilled = Boolean(newSquares[i]);

    if (winnerDeclared || squareFilled) {
      return;
    }

    // on détermine à qui vient le tour
    newSquares[i] = xIsNext ? "X" : "O";
    // appel de la fonction aprés mutation
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]} onClickEvent={() => handleClickEvent(i)} />
    );
  };

  // calcul du gagnant
  const winner = calculateWinner(squares);

  // afficharge du joueur en court ou du gagnant
  const status = winner
    ? `Winner: ${winner}`
    : `Next player : ${xIsNext ? "X" : "O"}`;

  function reGame() {
    document.location.reload();
  }
  const statusReload = winner ? (
    <button onClick={reGame}>Rejouer</button>
  ) : (
    false
  );

  return (
    <div>
      <div className="status">{status}</div>

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
      <div className="reload">{statusReload}</div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

root.render(<Game />);

function calculateWinner(squares) {
  // coups gagnants
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // lignes
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //colonnes
    [0, 4, 8],
    [2, 4, 6], // diagonales
  ];

  // pour chaque coup joué, je regarde si l'état actuel représente un coup gagnant
  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
