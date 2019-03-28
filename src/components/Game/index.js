import React, { Component } from "react";
import Board from "../Board";
import { connect } from "react-redux";
import { setGameLevel } from "./Game.actions";
import styled from "styled-components";

class index extends Component {
  componentDidMount() {
    this.props.setGameLevel(8);
  }

  render() {
    return (
      <div className={this.props.className}>
      
      <div className="difficulty">
           <span> Difficulty:</span>
            <button
              className={(this.props && this.props.order === 8 ? "active" : "")}
              onClick={() => this.props.setGameLevel(8)}
            >
              Easy
            </button>
            <button className={(this.props && this.props.order === 16 ? "active" : "")}
            onClick={() => this.props.setGameLevel(16)}>
              Intermediate
            </button>
            <button className={(this.props && this.props.order === 24 ? "active" : "")}
            onClick={() => this.props.setGameLevel(24)}>
              Hard
            </button>
          </div>
        <Board />
        <div className="rules">
          
          <h4>Game rules:</h4>
          <p>
            1. The first click will always be an empty cell. So, no more losing
            on the first click
          </p>
          <p>
            2. Left click will reveal the cell, right click will flag the cell
            for diffusion
          </p>
          <p>
            3. Right clicking on a number will reveal all the neighboring cells,
            provided there are as many neighboring flags as the number
            represents
          </p>
          <p>
            4. Clicking on smiley will validate if game is complete or not.
            Clicking on it before completion will reset the game
          </p>
          <p>
            5. Need help? clicking on hint (light bulb icon) will flag a mine
            for you. The icon is displayed after the game starts.
          </p>
        </div>
      </div>
    );
  }
}

const styledGame = styled(index)`
  & {
    .rules {
      padding: 20px;
      text-align: left;
      padding-top: 0px;
    }

    .difficulty {
      margin-top:30px;

      span{
        margin-right:10px;
      }

      button{
        outline:none;
      }
      .active {
        background-color: ${props=>props.theme.colors.influentialOrange};
        color:${props=>props.theme.colors.white};
      }
    }
  }
`;

const mapDispatchToProps = {
  setGameLevel
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledGame);
