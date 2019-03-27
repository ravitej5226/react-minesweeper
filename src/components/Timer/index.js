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
  componentDidUpdate(prevProps, prevState){
    if(this.state.gameState!==prevState.gameState)
    {
    this.tick()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.gameState!==prevState.gameState){
      return { gameState: nextProps.gameState,
      gameTime:nextProps.gameTime};
   }
   else return null;
 }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    if (this.props.gameState === GAME_STATE.RUNNING) {
      if (this.timerID) {
        this.setState(prevState => ({
          gameTime: prevState.gameTime + 1,
          formattedGameTime: common.getFormattedTime(prevState.gameTime + 1)
        }));
      }
      else {
        this.timerID = setInterval(() => this.tick(), 1000);
      }
    } else {
      clearInterval(this.timerID);
      this.timerID=null
      this.setState(prevState => ({
        gameTime: this.state.gameState,
        formattedGameTime: common.getFormattedTime(prevState.gameTime)
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
