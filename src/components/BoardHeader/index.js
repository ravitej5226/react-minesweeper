import React from 'react'
import Timer from "../Timer";
import GameState from "../GameState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Bootstrap from "react-bootstrap";
import { GAME_STATE } from '../../shared/constants';

export default function index(props){
  
    return (
      <div>
        <Bootstrap.Row className="board-header">
          <Bootstrap.Col className="header-section mine-rem">
            <div className="header-name">mines remaining</div>
            <div className="header-value">
            {props.gameState===GAME_STATE.RUNNING?
              <button onClick={props.onRevealOneMine} className="hint">
                <FontAwesomeIcon icon="lightbulb" />
              </button>
            :""}
              {props.minesRemaining}
            </div>
          </Bootstrap.Col>
          <Bootstrap.Col>
            <GameState
              gameState={props.gameState}
              onReset={props.onValidate}
            />
          </Bootstrap.Col>
          <Bootstrap.Col className="header-section">
            <div className="header-name">time</div>
            <div className="header-value">
              <Timer
                gameState={props.gameState}
                gameTime={props.gameTime}
              />
            </div>
          </Bootstrap.Col>
        </Bootstrap.Row>
      </div>
    )
  }

