import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CELL_TYPE } from "../../shared/constants";

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
          <div className="clear-tile">
            {this.props.tile.type === CELL_TYPE.MINE ? (
              <FontAwesomeIcon icon="bomb" />
            ) : (
              this.props.tile.value
            )}
          </div>
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
  border:4px solid ${props => props.theme.frameBorder};
  border-width:${props => (!props.tile.cleared ? "4px" : "2px")};
  background-color:${props =>
    props.tile.triggered
      ? props.theme.colors.errorRed
      : props.tile.cleared
      ? props.theme.colors.lighterGray
      : props.theme.colors.mediumGrey};
    color:${props => (props.tile.diffused ? "green" : "#000")}
  border-style:${props => (!props.tile.cleared ? "outset" : "")};
  
  .clear-tile{     
      color:${props => props.theme.valueColors[props.tile.value]}      
  }

  .clear-tile{
    ${props => props.theme.cellStyle[props.tile.type]}
      }

  button{
     width:26px;
      height:26px;
      padding:0px;
      padding-bottom:5px;
      border:0px;
      background-color:transparent      
  }
  button:not(:disabled){
    outline:none;
  }  
}
`;

export default StyledTile;
