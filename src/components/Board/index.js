import React, { Component } from 'react'
import Tile from '../Tile';
import styled from 'styled-components';

class index extends Component {
  render() {
    return (
      <div className={this.props.className}>
          
        {this.props.board.map(x=>(<Tile key={x.id} tile={x}></Tile>))}
      </div>
    )
  }
}

const StyledDiv=styled(index)`
&{
width:272px;
line-height:2px;
border:2px solid #ccc;
margin:30px auto;
display:flex;
flex-wrap:wrap;
}
`
export default StyledDiv;