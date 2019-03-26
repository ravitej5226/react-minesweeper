import React, { Component } from "react";
import Tile from "../Tile";
import styled from "styled-components";
import getNeighbors from "../../shared/common";
import Timer from "../Timer";
import GameState from "../GameState";
import { GAME_STATE } from "../../shared/constants";
import { connect } from "react-redux";
import {
  GENERATE_BOARD,
  TILE_CLICK,
  DIFFUSE_MINE,
  CLEAR_NEIGHBORS,
  REVEAL_ONE_MINE
} from "./Board.constants";
import * as Bootstrap from "react-bootstrap";
import PropTypes from "prop-types";

class index extends Component {
  constructor(props) {
    super(props);
    //  this.props.onTileClicked = this.props.onTileClicked.bind(this);
    //this.openOtherTiles = this.openOtherTiles.bind(this);
    //   this.diffuseBomb = this.diffuseBomb.bind(this);
    // this.clearTile=this.clearTile.bind(this)
    // this.updatedBoard =  Object.assign([], this.props.board)
    // this.visited = []

    //  this.state=this.props
  }

  componentDidMount() {
    this.props.generateBoard();
  }
  diffuseBomb(tileId) {}

  render() {
    return (
      <div className={this.props.className}>
        <Bootstrap.Row className="board-header">
          <Bootstrap.Col className="header-section">
            <div class="header-name">mines remaining</div>
            <div className="header-value">
              <button onClick={this.props.onRevealOneMine}>
                {this.props.minesRemaining}
              </button>
            </div>
          </Bootstrap.Col>
          <Bootstrap.Col>
            <h3>
              <GameState
                gameState={this.props.gameState}
                onReset={this.props.generateBoard}
              />
            </h3>
          </Bootstrap.Col>
          <Bootstrap.Col className="header-section">
            <div class="header-name">time</div>
            <div className="header-value">
              <Timer
                gameState={this.props.gameState}
                gameTime={this.props.gameTime}
              />
            </div>
          </Bootstrap.Col>
        </Bootstrap.Row>
        <Bootstrap.Row>
          <div className="board">
            {this.props.board ? (
              this.props.board.map(x => (
                <Tile
                  key={x.id}
                  tile={x}
                  onTileClicked={this.props.onTileClicked}
                  onDiffuseMine={this.props.onDiffuseMine}
                  onClearNeighbors={this.props.onClearNeighbors}
                />
              ))
            ) : (
              <div>Loading board</div>
            )}
          </div>
        </Bootstrap.Row>
      </div>
    );
  }
}

const StyledDiv = styled(index)`
  & {
    width: 244px;
    margin: 50px auto;

    .row {
      margin-right: 0px;
      margin-left: 0px;
    }

    .board {
      line-height: 2px;
      margin: 0px auto;
      border: 2px solid #ccc;

      display: flex;
      flex-wrap: wrap;
    }

    .board-header {
      border: 4px solid #ccc;
      border-bottom: 2px;
      padding: 5px;
      padding-bottom: 0px;
      .col {
        padding: 0px;
      }
    }

    .header-section {
      line-height: 1;
      text-align: center;
    }

    .header-value {
      font-size: 30px;
      font-weight: 600;
    }

    .header-name {
      font-size: 10px;
      font-weight: 300;
    }
  }
`;

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    generateBoard: () =>
      dispatch({
        type: GENERATE_BOARD
      }),
    onTileClicked: tileId =>
      dispatch({
        type: TILE_CLICK,
        tileId: tileId
      }),
    onDiffuseMine: tileId =>
      dispatch({
        type: DIFFUSE_MINE,
        tileId: tileId
      }),
    onClearNeighbors: tileId =>
      dispatch({
        type: CLEAR_NEIGHBORS,
        tileId: tileId
      }),
    onRevealOneMine: () =>
      dispatch({
        type: REVEAL_ONE_MINE
      })
  };
};

index.propTypes = {
  gameState: PropTypes.oneOf(GAME_STATE).isRequired,
  mineCount: PropTypes.number,
  minesRemaining: PropTypes.number,
  order: PropTypes.number,
  size: PropTypes.number,
  mines: PropTypes.array,
  gameTime: PropTypes.number,
  onRevealOneMine: PropTypes.func,
  onClearNeighbors: PropTypes.func,
  onDiffuseMine: PropTypes.func,
  onTileClicked: PropTypes.func,
  generateBoard: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledDiv);
