import React, { Component } from "react";
import { constants } from "../constants";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>{constants.APPLICATION_TITLE}</h1>
      </div>
    );
  }
}

export default App;
