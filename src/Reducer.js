import {
  GENERATE_BOARD,
  DIFFUSE_MINE,
  TILE_CLICK,
  CLEAR_NEIGHBORS,
  REVEAL_ONE_MINE
} from "./components/Board/Board.constants";
import { getNeighbors } from "./shared/common";
import { SET_GAME_LEVEL } from "./components/Game/Game.constants";

import { GAME_STATE } from "./shared/constants";

const initialState = {
  board: null,
  mineCount: 10,
  minesRemaining: 0,
  order: 8,
  size: 64,
  mines: [],
  gameState: GAME_STATE.INITIALIZED,
  gameTime: 0,
  timerId: null
};

function placeBombs(mineCount, size) {
  // Generate bombs
  let mineArray = new Array(mineCount).fill(-1);
  for (let index = 0; index < mineCount; index++) {
    let location = -1;
    while (mineArray.includes(location)) {
      location = Math.floor(Math.random() * size);
    }

    mineArray[index] = location;
  }
  return mineArray;
}

function clearTile(tileId, board) {
  // Check if it is a bomb
  // Else clear tile
  let item = { ...board[tileId] };
  item.cleared = true;

  if (item.value == "B") {
    item.triggered = true;
  }
  board[tileId] = item;
  return board;

  return board;
}

function getGameState(board, gameState) {
  // let gameState = "";
  let mines = board.filter(x => x.cleared && x.value === "B");
  if (mines.length > 0) {
    gameState = GAME_STATE.BUST;
    return gameState;
  }

  // Check for winning condition
  // If all the non-bombs are diffused, then the game is complete
  let nonMines = board.filter(x => !x.cleared && x.value !== "B");
  if (nonMines.length == 0) {
    gameState = GAME_STATE.WIN;
  }
  return gameState;
}

function revealBoard(board) {
  board.map(x => (x.cleared = true));
  return board;
}

function openOtherTiles(tileId, board, size, order) {
  let visited = [];
  let queue = [tileId];
  let boardState = {};
  let gameState = "";
  while (queue.length > 0) {
    let index = queue.pop();

    if (index < 0 || index > size - 1) {
      // return board;
      //continue;
    } else if (!board[index].diffused && !(board[index].value == "B")) {
      if (board[index].value != " ") {
        board = clearTile(index, board);
      } else {
        board = clearTile(index, board);

        console.log("getting neighbors");
        let neighbors = getNeighbors(index, order);
        neighbors.map(x => {
          if (
            !visited.includes(index + x) &&
            !(index + x < 0 || index + x > size - 1)
          ) {
            visited.push(index + x);
            queue.push(index + x);
          }
        });
        console.log("done loading queue");
        console.log(`queue: ${queue}`);
      }
    }
  }
  console.log(`visited: ${visited}`);
  return board;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_LEVEL:
      let order = action.order;
      let size = order * order;

      // TODO: Add logic if more levels are added
      let mineCount = 10;

      if (order == 16) {
        mineCount = 40;
      } else if (order == 24) {
        mineCount = 99;
      }
      let minesRemaining = mineCount;
      let gameTime = 0;
      let mines = [];
      let gameState = GAME_STATE.INITIALIZED;

      return Object.assign({}, state, {
        size,
        order,
        mineCount,
        gameTime,
        mines,
        gameState,
        minesRemaining
      });

    case GENERATE_BOARD: {
      let board = [];
      const previousState = { ...state };
      let gameState = GAME_STATE.INITIALIZED;
      let mineArray = placeBombs(previousState.mineCount, previousState.size);
      let minesRemaining = state.mineCount;
      for (let i = 0; i < previousState.size; i++) {
        const tile = {
          id: i,
          value: " ",
          diffused: false,
          cleared: false,
          triggered: false
        };

        // Check to place a bomb
        if (mineArray.includes(i)) {
          tile.value = "B";
        } else {
          // Check for number
          let neighbors = getNeighbors(i, previousState.order);

          // Check last column
          let count = 0;
          neighbors.map(x => {
            if (i + x >= 0 && mineArray.includes(i + x)) {
              count++;
            }
          });

          if (count > 0) {
            tile.value = count;
          }
        }

        board.push(tile);
      }

      return Object.assign({}, state, {
        board: board,
        mines: mineArray,
        gameState,
        minesRemaining
      });
    }
    case TILE_CLICK: {
      let gameState = GAME_STATE.RUNNING;
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      let size = state.size;
      let order = state.order;

      // Clear the tile
      board = clearTile(tileId, board, size);
      board = openOtherTiles(tileId, board, size, order);

      // Get the game state
      gameState = getGameState(board, gameState);

      if (gameState == GAME_STATE.WIN) {
        // TODO: Handle winning condition
      } else if (gameState === GAME_STATE.BUST) {
        // TODO: Handle game lost condition
        board = revealBoard(board);
      }

      return Object.assign({}, state, { board: board, gameState });
    }
    case DIFFUSE_MINE: {
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      let size = state.size;
      let order = state.order;
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

      // DO not open if value does not equals neighboring diffuses
      const neighbors = getNeighbors(tileId, order);

      // Check the diffuses in the neighbors
      let diffusedCount = 0;
      // If the diffused tiles are equal to or greater than value, open the neighbors
      neighbors.map(x => {
        if (x + tileId < 0 || x + tileId > size - 1) {
          return;
        }
        if (board[tileId + x].diffused) {
          diffusedCount++;
        }
      });

      if (diffusedCount >= board[tileId].value) {
        // Open the neighbors
        neighbors.map(x => {
          if (x + tileId < 0 || x + tileId > size - 1) {
            return;
          } else {
            if (!board[tileId + x].diffused) {
              board = clearTile(tileId + x, board);

              if (board[tileId + x].value == " ") {
                console.log("Triggering new logic");
                board = openOtherTiles(tileId + x, board, size, order);
              }
            }
          }
        });
      }

      // Get the game state
      gameState = getGameState(board, gameState);

      if (gameState == GAME_STATE.WIN) {
        // TODO: Handle winning condition
      } else if (gameState === GAME_STATE.BUST) {
        // TODO: Handle game lost condition
        board = revealBoard(board);
      }
      return Object.assign({}, state, { board, gameState });
    }

    case REVEAL_ONE_MINE: {
      let tileId = action.tileId;
      let board = Object.assign([], state.board);
      let size = state.size;
      let order = state.order;
      let mines = state.mines;
      let minesRemaining = state.minesRemaining;
      if (minesRemaining > 0) {
        // Get all diffused mines
        // Filter mines yet to be diffused
        // Pick a random mine
        // set diffused to true
        let diffusedMines = board
          .filter(x => x.diffused && x.value == "B")
          .map(y => y.id);

        let undiffusedMines = mines.filter(x => !diffusedMines.includes(x));
        let randomMine = parseInt(Math.random() * undiffusedMines.length);
        board[undiffusedMines[randomMine]].diffused = true;
        minesRemaining = minesRemaining - 1;
      }
      return Object.assign({}, state, { board, minesRemaining });
    }
    default:
      return state;
  }
};
