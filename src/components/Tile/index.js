import React, { Component } from 'react'
import styled from 'styled-components';
class index extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div data-val={this.props.tile.id}>
        {this.props.tile.value}
        </div>
      </div>
    )
  }
}

const StyledTile=styled(index)`
&{
  width:30px;
  height:30px;
  display:inline-block;
  border:2px solid #ccc;

  div{
    padding-top:10px;
  }
}
`

export default StyledTile;