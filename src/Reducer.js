import {
  GENERATE_BOARD,
  DIFFUSE_MINE,
  TILE_CLICK,
  CLEAR_NEIGHBORS,
  REVEAL_ONE_MINE,
  VALIDATE
} from "./components/Board/Board.constants";
import { SET_GAME_LEVEL } from "./components/Game/Game.constants";
import { GAME_STATE, CELL_TYPE } from "./shared/constants";
import common from "./shared/common";

// Initial state of the application
const initialState = {
  board: null,
  mineCount: 10,
  minesRemaining: 0,
  order: 8,
  size: 64,
  mines: [],
  gameState: GAME_STATE.INITIALIZED,
  gameTime: 0,
  gameInProgress: false
};

/**
 * Reducer for the entire application
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_LEVEL:
      // Set game level parameters
      let order = action.order;
      let size = order * order;
      const game = common.initializeGame(order, size);

      return Object.assign({}, state, {
        size,
        order,
        ...game
      });

    case GENERATE_BOARD: {
      let board = [];
      let gameState = GAME_STATE.INITIALIZED;
      let order = state.order;
      let minesRemaining = state.mineCount;
      let gameTime = 0;
      let initialTile = action.tileId;

      // Board is generated on first click
      // So, set the game to start
      let gameInProgress = true;

      // The initial tile should always be a blank
      // so, none of its neighbors should be mines
      let forbiddenTiles = common.getNeighbors(initialTile, order);
      forbiddenTiles = forbiddenTiles.map(x => x + initialTile);
      forbiddenTiles.push(initialTile);

      // Get the mine placements
      let mineArray = common.getMineLocations(
        state.mineCount,
        state.size,
        forbiddenTiles
      );

      for (let i = 0; i < state.size; i++) {
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
          tile.type = CELL_TYPE.MINE;
        } else {
          let neighbors = common.getNeighbors(i, state.order);

          let count = 0;
          neighbors = neighbors.map(x => {
            if (i + x >= 0 && mineArray.includes(i + x)) {
              count++;
            }
            return x;
          });

          // Set the count based on number of adjacent mines
          if (count > 0) {
            tile.value = count;
            tile.type = CELL_TYPE.NEIGHBOR;
          }
        }

        board.push(tile);
      }

      return Object.assign({}, state, {
        board: board,
        mines: mineArray,
        gameState,
        minesRemaining,
        gameTime,
        gameInProgress
      });
    }
    case TILE_CLICK: {
      let gameState = GAME_STATE.RUNNING;
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      let size = state.size;
      let order = state.order;

      // If the clicked tile is diffused, make it normal on click
      if (board[tileId].diffused) {
        board[tileId].diffused = false;
      } else {
        // Else attempt to clear it and its neighbors if applicable
        // Clear the tile
        board = common.clearTile(tileId, board, size);

        // Check neighbors and clear all the empty tiles
        board = common.openOtherTiles(tileId, board, size, order);

        // Get the game state
        gameState = common.getGameState(board, gameState, false);

        // Win condition is explicitly handled through validate logic
        if (gameState === GAME_STATE.BUST) {
          // Handle game lost condition
          board = common.revealBoard(board);
        }
      }

      return Object.assign({}, state, { board: board, gameState });
    }
    case DIFFUSE_MINE: {
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      let minesRemaining = state.minesRemaining;

      // Diffuse the mine and set the remaining mines
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
      neighbors = neighbors.map(x => {
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

      if (state.gameState === GAME_STATE.RUNNING) {
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

          if (undiffusedMines.length > 0) {
            board[undiffusedMines[randomMine]].diffused = true;
            minesRemaining = minesRemaining - 1;
          }
        }
      }
      return Object.assign({}, state, { board, minesRemaining });
    }

    case VALIDATE: {
      // Get the game state
      let board = Object.assign([], state.board);
      let gameState = state.gameState;
      let game = {};
      let resetGame = false;
      let minesRemaining = state.minesRemaining;

      if (gameState !== GAME_STATE.WIN) {
        gameState = common.getGameState(board, gameState, true);
        game.gameState = gameState;
      } else {
        resetGame = true;
      }

      // If it is a WIN, set state to win
      if (gameState !== GAME_STATE.WIN || resetGame) {
        // Else reset the board
        game = common.initializeGame(state.order, state.size);
      }

      if (gameState === GAME_STATE.WIN) {
        minesRemaining = 0;
      }

      return Object.assign({}, state, { ...game, minesRemaining });
    }
    default:
      return state;
  }
};
