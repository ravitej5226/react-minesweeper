import React, { Component } from "react";
import Tile from "../Tile";
import styled from "styled-components";
import Timer from "../Timer";
import GameState from "../GameState";
import { GAME_STATE } from "../../shared/constants";
import { connect } from "react-redux";
import {
  GENERATE_BOARD,
  TILE_CLICK,
  DIFFUSE_MINE,
  CLEAR_NEIGHBORS,
  REVEAL_ONE_MINE,
  VALIDATE
} from "./Board.constants";
import * as Bootstrap from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class index extends Component {
  constructor(props) {
    super(props);

    this.onTileClick = this.onTileClick.bind(this)
  }

  onTileClick = (tileId) => {
    if (this.props.gameStart) {
      this.props.onTileClicked(tileId)
    }
    else {
      this.props.generateBoard(tileId)
      this.props.onTileClicked(tileId)
    }
  }


  render() {
    return (
      <div className={this.props.className}>
        <Bootstrap.Row className="board-header">
          <Bootstrap.Col className="header-section">
            <div class="header-name">mines remaining</div>
            <div className="header-value">
              <button onClick={this.props.onRevealOneMine} className="hint">
                <FontAwesomeIcon icon="lightbulb" />
              </button>
              {this.props.minesRemaining}

            </div>
          </Bootstrap.Col>
          <Bootstrap.Col>
          
              <GameState 
                gameState={this.props.gameState}
                onReset={this.props.onValidate}
              />
           
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
                  onTileClicked={this.onTileClick}
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
      
      .col {
        padding: 0px;
      }
    }

    .header-section {
      line-height: 1;
      text-align: right;
    }

    .header-value {
      font-size: 24px;
      font-weight: 600;
    }

    .header-name {
      font-size: 9px;
      font-weight: 300;
    }

    .hint{
      font-size: 14px;
    vertical-align: middle;
    border:none;
    outline:none;
    }
  }
`;

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    generateBoard: (tileId) =>
      dispatch({
        type: GENERATE_BOARD,
        tileId: tileId
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
    ,
    onValidate: () =>
      dispatch({
        type: VALIDATE
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
