import React, { Component } from 'react'
import Tile from '../Tile';
import styled from 'styled-components';
import getNeighbors from '../../shared/common';

class index extends Component {
    constructor(props) {
        super(props);
        this.onTileClicked = this.onTileClicked.bind(this);
        this.openOtherTiles = this.openOtherTiles.bind(this);
        this.diffuseBomb = this.diffuseBomb.bind(this);
        this.updatedBoard = this.props.board
        this.visited = []

    }
    diffuseBomb(tileId) {
        let newBoard = this.updatedBoard;
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

            neighbors.map(x => {
                if (tileId < 0 || tileId > this.props.size - 1) {
                    return;
                }

            });

            this.setState({
                board: newBoard
            })
        }
    }
    onTileClicked(tileId) {
        let newBoard = this.updatedBoard;

        // TODO: check for bomb
        newBoard[tileId].cleared = true;
        this.visited=[]
        this.openOtherTiles(tileId);
        this.setState({
            board: newBoard
        })
    }

    openOtherTiles(tileId,forceOpen) {


        if (tileId < 0 || tileId > this.props.size - 1) {
            return;
        }
        if (this.updatedBoard[tileId].value.diffused){
            return;
        }
        console.log(tileId)
        if (this.updatedBoard[tileId].value == 'B') {
            return;
        }
        if (this.updatedBoard[tileId].value != " ") {
            this.updatedBoard[tileId].cleared = true;
            return;
        }
        else {
            this.updatedBoard[tileId].cleared = true;
            let neighbors = getNeighbors(tileId, this.props.order);
            neighbors.map(x => {
                if (!this.visited.includes(tileId + x)) {
                    this.visited.push(tileId + x)
                    this.openOtherTiles(tileId + x)
                }

            })
        }

    }
    render() {
        return (
            <div className={this.props.className}>

                {this.props.board.map(x => (<Tile key={x.id} tile={x} onTileClicked={this.onTileClicked}
                    onDiffuseBomb={this.diffuseBomb}></Tile>))}
            </div>
        )
    }
}

const StyledDiv = styled(index)`
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