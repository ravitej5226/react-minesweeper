import React, { Component } from 'react'
import Tile from '../Tile';
import styled from 'styled-components';
import getNeighbors from '../../shared/common';
import Timer from '../Timer';
import GameState from '../GameState';
import { connect } from 'react-redux'
import {GENERATE_BOARD, TILE_CLICK,DIFFUSE_MINE} from './Board.constants';

class index extends Component {
    constructor(props) {
        super(props);
      //  this.props.onTileClicked = this.props.onTileClicked.bind(this);
        //this.openOtherTiles = this.openOtherTiles.bind(this);
     //   this.diffuseBomb = this.diffuseBomb.bind(this);
       // this.clearTile=this.clearTile.bind(this)
       // this.updatedBoard =  Object.assign([], this.props.board)
       // this.visited = []

      //  this.state=this.props
        

    }

    componentDidMount(){    
        this.props.generateBoard();
      }
    diffuseBomb(tileId) {
        
    }
    
    
   

    
    render() {
        return (
            <div className={this.props.className}>
            <h3><GameState gameState={this.props.gameState}/></h3>
            <h4><Timer gameState={this.props.gameState} gameTime={this.props.gameTime} /></h4>
            <h4>{this.props.minesRemaining}</h4>
            <div className='board'>

               {this.props.board?this.props.board.map(x => (<Tile key={x.id} tile={x} onTileClicked={this.props.onTileClicked}
                    onDiffuseMine={this.props.onDiffuseMine}></Tile>)):<div>Loading board</div>}
                    
            </div>
            </div>
        )
    }
}

const StyledDiv = styled(index)`
&{
   .board
    { width:272px;
line-height:2px;
margin:30px auto;
border:2px solid #ccc;

display:flex;
flex-wrap:wrap;
   }
}
`

const mapStateToProps=(state)=>
{
return state;
}

const mapDispatchToProps=(dispatch)=>{
 return{ 
   generateBoard:()=>dispatch({
    type:GENERATE_BOARD
  }),
  onTileClicked:(tileId)=>dispatch({
      type:TILE_CLICK,
      tileId:tileId
  }),
  onDiffuseMine:(tileId)=>dispatch({
      type:DIFFUSE_MINE,
      tileId,tileId
  })
  
}
}

export default connect(mapStateToProps,mapDispatchToProps)(StyledDiv);