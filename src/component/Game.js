import React, { useState } from "react";
import { constants } from "../constants";
import Square from "./Square";

const Game = () => {
  const initialState = {
    activePlayer: constants.PLAYER_X,
    winner: null
  };
  const [gameState, setGameState] = useState(initialState);
  const [square, setSquare] = useState([]);

  const renderSquare = () => {
    let squareList = [];

    for (let i = 0; i < 9; i++) {
      squareList.push(
        <li key={i}>
          <Square
            clickNotification={clickNotification.bind(this, i)}
            value={getFilledSquaresValue(i)}
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

  const checkActivePlayerWintheGame = () => {
    if (isAnyRowCompletedByTheActivePlayer()) {
      setGameState(prevState => ({
        ...prevState,
        winner: gameState.activePlayer
      }));
    } else {
      setGameState(prevState => ({
        ...prevState,
        activePlayer: getInactivePlayer()
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

  const showGameOverMessage = () => {
    return gameState.winner ? (
      <p className="win-msg">{`Player ${gameState.winner} win the game`}</p>
    ) : (
      <p>''</p>
    );
  };

  return (
    <div className="game">
      <h4>{`${constants.PLAYER_NEXT} ${gameState.activePlayer}`}</h4>
      <ul className="board">{renderSquare()}</ul>
      {showGameOverMessage()}
    </div>
  );
};

export default Game;
