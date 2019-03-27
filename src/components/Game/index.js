import React, { Component } from "react";
import Board from "../Board";
import { connect } from 'react-redux'
import { SET_GAME_LEVEL} from './Game.constants';


class index extends Component {
  componentDidMount(){
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



const mapDispatchToProps=(dispatch)=>{
 return{
  setGameLevel:(order)=>dispatch({
    type:SET_GAME_LEVEL,
    order:order
  })
}
}

export default connect(null,mapDispatchToProps)(index)
