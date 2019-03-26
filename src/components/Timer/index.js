import React, { Component } from "react";
import * as common from "../../shared/common";
import { GAME_STATE } from "../../shared/constants";
import PropTypes from "prop-types";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: this.props.gameState,
      gameTime: this.props.gameTime,
      formattedGameTime: common.getFormattedTime(this.props.gameTime.toString())
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    if (this.props.gameState == GAME_STATE.RUNNING) {
      this.setState(prevState => ({
        gameTime: prevState.gameTime + 1,
        formattedGameTime: common.getFormattedTime(prevState.gameTime + 1)
      }));
    }
  };

  render() {
    return <div>{this.state.formattedGameTime}</div>;
  }
}

index.propTypes = {
  gameState: PropTypes.oneOf(GAME_STATE).isRequired
};
