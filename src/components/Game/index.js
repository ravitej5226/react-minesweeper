import React, { Component } from "react";
import Board from "../Board";
import Styled from "styled-components";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      bombCount: 10,
      order: 8,
      size: 64,
      bombs: []
    };
    this.generateBoard();
  }
  placeBombs = () => {
    // Generate bombs
    let bombArray = new Array(this.state.bombCount).fill(-1);
    for (let index = 0; index < this.state.bombCount; index++) {
      let location = -1;
      while (bombArray.includes(location)) {
        location = Math.floor(Math.random() * this.state.size);
      }
      bombArray[index] = location;
    }
    this.state.bombs = bombArray;
  };
  generateBoard = () => {
    let board = [];
    this.placeBombs();
    for (let i = 0; i < this.state.size; i++) {
      const tile = {
        id: i,
        value: " "
      };

      // Check to place a bomb
      if (this.state.bombs.includes(i)) {
        tile.value = "B";
      } else {
        // Check for number
        let neighbors = [-8, 8];
        // Check first column
        if (i % this.state.order != 0) {
          neighbors.push(-9, -1, 7);
          console.log(neighbors);
        }

        // Check last column
        if ((i + 1) % this.state.order != 0) {
          neighbors.push(9, 1, -7);
          console.log(neighbors);
        }

        // Check last column
        let count = 0;
        neighbors.map(x => {
          if (i + x > 0 && this.state.bombs.includes(i + x)) {
            count++;
          }
        });

        if (count > 0) {
          tile.value = count;
        }
      }

      board.push(tile);
    }
    this.state.board = board;
    this.setState({
      board: board
    });
  };
  render() {
    return (
      <div className={this.props.className}>
        {console.log(this.state.board)}
        <Board board={this.state.board} />
      </div>
    );
  }
}
