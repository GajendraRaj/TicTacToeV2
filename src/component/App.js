import React from "react";
import { constants } from "../constants";
import Game from "./Game";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>{constants.APPLICATION_TITLE}</h1>
      <Game />
    </div>
  );
};

export default App;
