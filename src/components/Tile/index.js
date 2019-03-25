import React, { Component } from 'react'
import styled from 'styled-components';
class index extends Component {
    handleClick(e,id) {
        e.preventDefault();
       // e.stopPropgation();
       if (e.type === 'contextmenu') {
         this.props.onDiffuseBomb(id)
        }
     }
    render() {
        return (
            <div className={this.props.className} data-val={this.props.tile.id} onContextMenu={(e)=>this.handleClick(e,this.props.tile.id)}>
                {!this.props.tile.cleared ?
                    (<button onClick={()=>this.props.onTileClicked(this.props.tile.id)} >

                    </button>) : (this.props.tile.diffused?(
                        <div className='diffuse-tile'>
                            </div>
                    ):(
                        <div className='clear-tile'>
                            {this.props.tile.value}
                        </div>
                    ))
                }
            </div>
        )
    }
}

const StyledTile = styled(index)`
&{
  width:30px;
  height:30px;
  display:inline-block;
  border:2px solid #ccc;
  background-color:${props=>props.tile.triggered?'red':props.tile.cleared?'#bfbfbf':props.tile.diffused?'green':'#FFFFF'}
  .clear-tile,.diffuse-tile{
      width:inherit;
      height:inherit;
      padding-top:15px;
      
  }

  

  button{
      width:inherit;
      height:inherit;
      padding:0px;
      border:0px;
      background-color:transparent
  }

  
}
`

export default StyledTile;