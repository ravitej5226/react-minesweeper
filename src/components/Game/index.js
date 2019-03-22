import React, { Component } from 'react'
import Board from '../Board';



export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: null
    }
    this.generateBoard()
  }
  generateBoard = () => {
    this.size = 64;

    let board = []
    for (let i = 0; i < this.size; i++) {
      const tile = {
        id: i,
        value: i
      }

      board.push(tile)
    }
    this.state.board = board;
    this.setState({
      board: board
    })

  }
  render() {
    return (
      
      <div>
      {console.log(this.state.board)}  
<Board board={this.state.board}></Board>
      </div>
    )
  }
}
