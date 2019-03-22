import React, { Component } from 'react'
import Tile from '../Tile';

export default class index extends Component {
  render() {
    return (
      <div>
          
        {this.props.board.map(x=>(<Tile key={x.id} tile={x}></Tile>))}
      </div>
    )
  }
}
