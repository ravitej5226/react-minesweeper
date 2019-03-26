import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class index extends Component {
  handleClick(e, id, isCleared) {
    e.preventDefault();
    // e.stopPropgation();
    if (e.type === "contextmenu") {
      if (!isCleared) {
        this.props.onDiffuseMine(id);
      } else {
        this.props.onClearNeighbors(id);
      }
    }
  }
  render() {
    return (
      <div
        className={this.props.className}
        data-val={this.props.tile.id}
        onContextMenu={e =>
          this.handleClick(e, this.props.tile.id, this.props.tile.cleared)
        }
      >
        {!this.props.tile.cleared ? (
          <button onClick={() => this.props.onTileClicked(this.props.tile.id)}>
            {this.props.tile.diffused ? (
              <FontAwesomeIcon icon="map-marker-alt" />
            ) : (
              ""
            )}
          </button>
        ) : this.props.tile.cleared ? (
          <div className="clear-tile">{this.props.tile.value}</div>
        ) : (
          <div className="diffuse-tile">T</div>
        )}
      </div>
    );
  }
}

const StyledTile = styled(index)`
&{
  width:30px;
  height:30px;
  display:inline-block;
  border:2px solid #ccc;
  background-color:${props =>
    props.tile.triggered ? "red" : props.tile.cleared ? "#bfbfbf" : "#FFFFF"}
    color:${props => (props.tile.diffused ? "green" : "#000")}
  .clear-tile,.diffuse-tile{     
      padding-top:12px;
      
  }
  button{
     width:inherit;
      height:inherit;
      padding:0px;
      padding-bottom:5px;
      border:0px;
      background-color:transparent
  }

  
}
`;

export default StyledTile;
