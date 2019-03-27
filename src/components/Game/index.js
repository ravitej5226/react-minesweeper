import React, { Component } from "react";
import Board from "../Board";
import { connect } from "react-redux";
import { setGameLevel } from "./Game.actions";
class index extends Component {
  componentDidMount() {
    this.props.setGameLevel(8);
  }

  render() {
    return (
      <div className={this.props.className}>
        <Board />
      </div>
    );
  }
}

const mapDispatchToProps = {
  setGameLevel
};

export default connect(
  null,
  mapDispatchToProps
)(index);
