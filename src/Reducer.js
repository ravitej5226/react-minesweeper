import {
  GENERATE_BOARD,
  DIFFUSE_MINE,
  TILE_CLICK,
  CLEAR_NEIGHBORS,
  REVEAL_ONE_MINE,
  VALIDATE
} from "./components/Board/Board.constants";
// import { getNeighbors } from "./shared/common";
import { SET_GAME_LEVEL } from "./components/Game/Game.constants";

import { GAME_STATE, CELL_TYPE } from "./shared/constants";
import common from './shared/common'

const initialState = {
  board: null,
  mineCount: 10,
  minesRemaining: 0,
  order: 8,
  size: 64,
  mines: [],
  gameState: GAME_STATE.INITIALIZED,
  gameTime: 0,
  gameStart: false
};


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_LEVEL:
      let order = action.order;
      let size = order * order;

      // TODO: Add logic if more levels are added
      const game = common.initializeGame(order, size)

      return Object.assign({}, state, {

        size,
        order,
        ...game
      });

    case GENERATE_BOARD: {
      let board = [];
      const previousState = { ...state };
      let gameState = GAME_STATE.INITIALIZED;

      let minesRemaining = state.mineCount;
      let gameTime = 0;
      let initialTile = action.tileId;
      let forbiddenTiles = common.getNeighbors(initialTile, order)
      forbiddenTiles = forbiddenTiles.map(x => x + initialTile)
      forbiddenTiles.push(initialTile)
      console.log(`forbidden tiles: ${forbiddenTiles}`)
      let mineArray = common.placeBombs(previousState.mineCount, previousState.size, forbiddenTiles);
      console.log(`mines: ${mineArray}`)
      for (let i = 0; i < previousState.size; i++) {
        const tile = {
          id: i,
          value: " ",
          diffused: false,
          cleared: false,
          triggered: false,
          type: CELL_TYPE.NORMAL
        };

        // Check to place a bomb
        if (mineArray.includes(i)) {
          tile.value = "B";
          tile.type = CELL_TYPE.MINE
        } else {
          // Check for number
          let neighbors = common.getNeighbors(i, previousState.order);

          // Check last column
          let count = 0;
          neighbors=neighbors.map(x => {
            if (i + x >= 0 && mineArray.includes(i + x)) {
              count++;
            }
            return x
          });

          if (count > 0) {
            tile.value = count;
            tile.type = CELL_TYPE.NEIGHBOR
          }
        }

        board.push(tile);
      }
      let gameStart = true;
      return Object.assign({}, state, {
        board: board,
        mines: mineArray,
        gameState,
        minesRemaining,
        gameTime,
        gameStart
      });
    }
    case TILE_CLICK: {
      let gameState = GAME_STATE.RUNNING;
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      let size = state.size;
      let order = state.order;

      // Clear the tile
      board = common.clearTile(tileId, board, size);
      board = common.openOtherTiles(tileId, board, size, order);

      // Get the game state
      gameState = common.getGameState(board, gameState);

      // Win condition is explicitly handled through validate logic
      // if (gameState == GAME_STATE.WIN) {
      //   // TODO: Handle winning condition
      // } else 
      if (gameState === GAME_STATE.BUST) {
        // TODO: Handle game lost condition
        board = common.revealBoard(board);
      }

      return Object.assign({}, state, { board: board, gameState });
    }
    case DIFFUSE_MINE: {
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      
      let minesRemaining = state.minesRemaining;
      if (!board[tileId].cleared) {
        board[tileId].diffused = !board[tileId].diffused;
        minesRemaining = state.mineCount - board.filter(x => x.diffused).length;
      }
      return Object.assign({}, state, { board, minesRemaining });
    }

    case CLEAR_NEIGHBORS: {
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      let size = state.size;
      let order = state.order;
      let gameState = state.gameState;

      // DO not open if value does not equals neighboring diffuses
      let neighbors = common.getNeighbors(tileId, order);

      // Check the diffuses in the neighbors
      let diffusedCount = 0;
      // If the diffused tiles are equal to or greater than value, open the neighbors
      neighbors=neighbors.map(x => {
        if (x + tileId < 0 || x + tileId > size - 1) {
          return x;
        }
        if (board[tileId + x].diffused) {
          diffusedCount++;
        }
        return x;
      });

      if (diffusedCount >= board[tileId].value) {
        // Open the neighbors
        neighbors.map(x => {
          if (x + tileId < 0 || x + tileId > size - 1) {
            return x;
          } else {
            if (!board[tileId + x].diffused) {
              board = common.clearTile(tileId + x, board);

              if (board[tileId + x].value === " ") {
                console.log("Triggering new logic");
                board = common.openOtherTiles(tileId + x, board, size, order);
              }
            }
            return x;
          }
        });
      }

      // Get the game state
      gameState = common.getGameState(board, gameState, false);

      // Win condition is explicitly handled through validate method
      // if (gameState == GAME_STATE.WIN) {
      //   // TODO: Handle winning condition
      // } else 
      if (gameState === GAME_STATE.BUST) {
        // TODO: Handle game lost condition
        board = common.revealBoard(board);
      }
      return Object.assign({}, state, { board, gameState });
    }

    case REVEAL_ONE_MINE: {

      let board = Object.assign([], state.board);

      let mines = state.mines;
      let minesRemaining = state.minesRemaining;
      if (minesRemaining > 0) {
        // Get all diffused mines
        // Filter mines yet to be diffused
        // Pick a random mine
        // set diffused to true
        let diffusedMines = board
          .filter(x => x.diffused && x.value === "B")
          .map(y => y.id);

        let undiffusedMines = mines.filter(x => !diffusedMines.includes(x));
        let randomMine = parseInt(Math.random() * undiffusedMines.length);

        if(undiffusedMines.length>0){
        board[undiffusedMines[randomMine]].diffused = true;
        minesRemaining = minesRemaining - 1;
        }
      }
      return Object.assign({}, state, { board, minesRemaining });
    }

    case VALIDATE: {
      // Get the game state
      let board = Object.assign([], state.board);
      let gameState = state.gameState;
      let game = {}
      let resetGame=false

      if (gameState !== GAME_STATE.WIN){
      gameState=common.getGameState(board,gameState,true);
      game.gameState = gameState;
      }
      else{
        resetGame=true
      }

      // If it is a WIN, set state to win
      if (gameState !== GAME_STATE.WIN || resetGame) {
        // Else reset the board
        game = common.initializeGame(state.order, state.size)
      }
      
      return Object.assign({}, state, { ...game });
    }
    default:
      return state;
  }
};
