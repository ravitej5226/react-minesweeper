import React, { Component } from "react";
import Board from "../Board";
import Styled from "styled-components";
import getNeighbors from "../../shared/common";
import { connect } from 'react-redux'
import { SET_GAME_LEVEL} from './Game.constants';


class index extends Component {
  constructor(props) {
    super(props);
    this.state=this.props    
  }

  componentWillMount(){
    this.props.setGameLevel(8);
   
  }
  
  render() {
    return (
      <div className={this.props.className}>
        
        <Board />
      </div>
    );
  }
}

const mapStateToProps=(state)=>
{
return state;
}

const mapDispatchToProps=(dispatch)=>{
 return{
  setGameLevel:(order)=>dispatch({
    type:SET_GAME_LEVEL,
    order:order
  })
}
}

export default connect(mapStateToProps,mapDispatchToProps)(index)
