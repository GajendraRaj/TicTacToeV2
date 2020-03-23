import React, { useState } from "react";
import { constants } from "../constants";
import Square from "./Square";

const Game = () => {
  const initialState = {
    activePlayer: constants.PLAYER_X,
    winner: null,
    isGameOver: false
  };
  const [gameState, setGameState] = useState(initialState);
  const [square, setSquare] = useState([]);
  const [filledSquareCount, setFilledSquareCount] = useState(0);

  const renderSquare = () => {
    let squareList = [];

    for (let i = 0; i < 9; i++) {
      squareList.push(
        <li key={i}>
          <Square
            clickNotification={clickNotification.bind(this, i)}
            value={getFilledSquaresValue(i)}
            isDisabled={isSquareDisabled(i)}
          />
        </li>
      );
    }

    return squareList;
  };

  const clickNotification = index => {
    let filledSquares = square;

    filledSquares[index] = gameState.activePlayer;
    setSquare(filledSquares);
    setGameState(prevState => ({
      ...prevState,
      activePlayer: getInactivePlayer()
    }));
    setFilledSquareCount(filledSquareCount + 1);
    checkActivePlayerWintheGame();
  };

  const getFilledSquaresValue = index => {
    return square[index] || "";
  };

  const getInactivePlayer = () => {
    return gameState.activePlayer === constants.PLAYER_X
      ? constants.PLAYER_O
      : constants.PLAYER_X;
  };

  const isSquareDisabled = index => {
    return square[index] || gameState.isGameOver ? true : false;
  };

  const checkActivePlayerWintheGame = () => {
    if (
      isAnyRowCompletedByTheActivePlayer() ||
      isAnyColumnCompletedByTheActivePlayer() ||
      isAnyDiagonalCompletedByTheActivePlayer()
    ) {
      setGameState(prevState => ({
        ...prevState,
        winner: gameState.activePlayer,
        isGameOver: true
      }));
    } else if (isGameDrawn()) {
      setGameState(prevState => ({
        ...prevState,
        isGameOver: true
      }));
    } else {
      setGameState(prevState => ({
        ...prevState,
        activePlayer: getInactivePlayer(),
        isGameOver: false
      }));
    }
  };

  const isAnyRowCompletedByTheActivePlayer = () => {
    const rowStartIndexList = [0, 3, 6];
    const totalRows = 3;
    let isPlayerWin = false;

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      let rowStartIndex = rowStartIndexList[rowIndex];
      if (isRowCompletedByTheActivePlayer(rowStartIndex)) {
        isPlayerWin = true;
        break;
      }
    }

    return isPlayerWin;
  };

  const isRowCompletedByTheActivePlayer = rowStartIndex => {
    const activePlayer = gameState.activePlayer;
    const filledSquares = square;

    return (
      filledSquares[rowStartIndex] === activePlayer &&
      filledSquares[rowStartIndex + 1] === activePlayer &&
      filledSquares[rowStartIndex + 2] === activePlayer
    );
  };

  const isAnyColumnCompletedByTheActivePlayer = () => {
    const columnStartIndexList = [0, 1, 2];
    const totalColumns = 3;
    let isPlayerWin = false;

    for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
      let columnStartIndex = columnStartIndexList[columnIndex];
      if (isColumnCompletedByTheActivePlayer(columnStartIndex, totalColumns)) {
        isPlayerWin = true;
        break;
      }
    }

    return isPlayerWin;
  };

  const isColumnCompletedByTheActivePlayer = (
    columnStartIndex,
    totalColumns
  ) => {
    const filledSquares = square;
    const activePlayer = gameState.activePlayer;

    return (
      filledSquares[columnStartIndex] === activePlayer &&
      filledSquares[columnStartIndex + totalColumns] === activePlayer &&
      filledSquares[columnStartIndex + 2 * totalColumns] === activePlayer
    );
  };

  const isAnyDiagonalCompletedByTheActivePlayer = () => {
    const totalDiagonals = 2;
    let isPlayerWin = false;

    for (
      let diagonalIndex = 0;
      diagonalIndex < totalDiagonals;
      diagonalIndex++
    ) {
      if (isDiagonalCompletedByTheActivePlayer(diagonalIndex)) {
        isPlayerWin = true;
        break;
      }
    }

    return isPlayerWin;
  };

  const isDiagonalCompletedByTheActivePlayer = index => {
    const diagonalIndexList = [
      [0, 4, 8],
      [2, 4, 6]
    ];
    const filledSquares = square;
    const activePlayer = gameState.activePlayer;

    return (
      filledSquares[diagonalIndexList[index][0]] === activePlayer &&
      filledSquares[diagonalIndexList[index][1]] === activePlayer &&
      filledSquares[diagonalIndexList[index][2]] === activePlayer
    );
  };

  const isGameDrawn = () => {
    return filledSquareCount === 8;
  };

  const showGameOverMessage = () => {
    return gameState.winner ? (
      <p className="win-msg">{`Player ${gameState.winner} win the game`}</p>
    ) : (
      <p>{"Game drawn"}</p>
    );
  };

  return (
    <div className="game">
      <h4>{`${constants.PLAYER_NEXT} ${gameState.activePlayer}`}</h4>
      <ul className="board">{renderSquare()}</ul>
      {gameState.isGameOver && showGameOverMessage()}
    </div>
  );
};

export default Game;
