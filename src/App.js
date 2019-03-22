import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game';

class App extends Component {
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
