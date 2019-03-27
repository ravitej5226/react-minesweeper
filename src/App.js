import React, { Component } from "react";
// import "./App.css";
import Game from "./components/Game";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(far);
library.add(fas);
export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Minesweeper</h2>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
