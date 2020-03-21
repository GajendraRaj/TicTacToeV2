import React, { useState } from "react";
import { constants } from "../constants";
import Square from "./Square";

const Game = () => {
  const initialState = {
    activePlayer: constants.PLAYER_X
  };
  const [gameState, setGameState] = useState(initialState);

  return (
    <div>
      <h4>{`${constants.PLAYER_NEXT} ${gameState.activePlayer}`}</h4>
      <Square value={gameState.activePlayer} />
    </div>
  );
};

export default Game;
