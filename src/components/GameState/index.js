import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GAME_STATE } from "../../shared/constants";
import styled from 'styled-components';

 class index extends Component {
  render() {
    return (
      <button className={this.props.className} onClick={this.props.onReset}>
        <div>
          {this.props.gameState === GAME_STATE.BUST ? (
            <FontAwesomeIcon icon={["fas", "tired"]} />
          ) : this.props.gameState === GAME_STATE.WIN ? (
            <FontAwesomeIcon icon={["fas", "grin-hearts"]} />
          ) : (
            <FontAwesomeIcon icon={["fas", "smile"]} />
          )}
        </div>
      </button>
    );
  }
}

const StyledButton=styled(index)`
&{
  font-size: 25px;
    border: 4px solid;
    border-style: outset;
    background-color:#ccc;
    outline:none;
    color:${props=>props.theme.colors.dynamicYellow}

    
}
button:not(:disabled){
  outline:none;
}`

export default StyledButton;