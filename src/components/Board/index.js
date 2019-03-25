import React, { Component } from 'react'
import Tile from '../Tile';
import styled from 'styled-components';
import getNeighbors from '../../shared/common';
import Timer from '../Timer';
import GameState from '../GameState';

class index extends Component {
    constructor(props) {
        super(props);
        this.onTileClicked = this.onTileClicked.bind(this);
        this.openOtherTiles = this.openOtherTiles.bind(this);
        this.diffuseBomb = this.diffuseBomb.bind(this);
        this.clearTile=this.clearTile.bind(this)
       // this.updatedBoard =  Object.assign([], this.props.board)
        this.visited = []

        this.state={
            board:this.props.board,
            gameState:this.props.gameState,
            gameTime:this.props.gameTime

        }
        

    }
    diffuseBomb(tileId) {
        let newBoard = this.state.board;
        if (!newBoard[tileId].cleared) {
            newBoard[tileId].diffused = !newBoard[tileId].diffused;
            this.setState({
                board: newBoard
            })
        }
        else if (newBoard[tileId].value != " ") {
            this.visited=[]
            // TODO: DO not open if value does not equals neighboring diffuses
            const neighbors=getNeighbors(tileId,this.props.order);

            // Check the diffuses in the neighbors
            let diffusedCount=0
            // If the diffused tiles are equal to or greater than value, open the neighbors
            neighbors.map(x => {
                if (x+tileId < 0 || x+tileId > this.props.size - 1) {
                    return;
                }
                if(newBoard[tileId+x].diffused)
                {
                    diffusedCount++;
                }
            })

            if(diffusedCount>=newBoard[tileId].value){
                // Open the neighbors
                neighbors.map(x=>{
                    if (x+tileId < 0 || x+tileId > this.props.size - 1) {
                        return;
                    }
                    else{
                        if(!newBoard[tileId+x].diffused)
                        {
                        this.clearTile(tileId+x,newBoard)
                        }
                    }
                })
            }
         

            this.setState({
                board: newBoard
            })
        }
    }
    revealBoard=()=>{
        let board=Object.assign([],this.state.board)
        board.map(x=>x.cleared=true)
        this.setState({
            board:board
        }) 
    }
    clearTile(tileId,board){
        // Check if it is a bomb
        // Else clear tile
        let item={...board[tileId]}
       item.cleared=true
       board[tileId]=item;
       
        
        if(board[tileId].value=='B'){
            this.gameState='BUST'
            this.setState({
                gameState:'BUST'
            })
            board[tileId].triggered=true
            this.revealBoard();
            return board;
        }

        // Check for winning condition
        // If all the non-bombs are diffused, then the game is complete
        let nonBombs=board.filter(x=>!x.cleared && x.value!=="B")
        if(nonBombs.length==0){
            this.setState({
                gameState:'WIN'
            })
        }
        return board; 
    }
    onTileClicked(tileId) {
        this.setState({
            gameState:'RUNNING'
        })
       let board=Object.assign([],this.state.board)

        // TODO: check for bomb
        board=this.clearTile(tileId,board);
        this.visited=[]
        this.openOtherTiles(tileId,board);
       
        this.setState({
            board:board
        }) 
    }

    openOtherTiles(tileId,board) {


        if (tileId < 0 || tileId > this.props.size - 1) {
            return board;
        }
        if (board[tileId].value.diffused){
            return board;
        }
        console.log(tileId)
        if (board[tileId].value == 'B') {
            return board;
        }
        if (board[tileId].value != " ") {
           this.clearTile(tileId,board);
            return board;
        }
        else {
            this.clearTile(tileId,board);
            let neighbors = getNeighbors(tileId, this.props.order);
            neighbors.map(x => {
                if (!this.visited.includes(tileId + x)) {
                    this.visited.push(tileId + x)
                    this.openOtherTiles(tileId + x,board)
                }

            })
        }

    }
    render() {
        return (
            <div className={this.props.className}>
            <h3><GameState gameState={this.state.gameState}/></h3>
            <h4><Timer gameState={this.state.gameState} gameTime={this.state.gameTime} /></h4>
            <div className='board'>
               {this.state.board.map(x => (<Tile key={x.id} tile={x} onTileClicked={this.onTileClicked}
                    onDiffuseBomb={this.diffuseBomb}></Tile>))}
                    
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
export default StyledDiv;