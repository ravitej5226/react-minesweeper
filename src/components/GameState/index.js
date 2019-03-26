import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GAME_STATE } from "../../shared/constants";

export default class index extends Component {
  render() {
    return (
      <button onClick={this.props.onReset}>
        <div>
          {this.props.gameState == GAME_STATE.BUST ? (
            <FontAwesomeIcon icon={["far", "tired"]} />
          ) : this.props.gameState == GAME_STATE.WIN ? (
            <FontAwesomeIcon icon={["far", "grin-hearts"]} />
          ) : (
            <FontAwesomeIcon icon={["far", "smile"]} />
          )}
        </div>
      </button>
    );
  }
}
