import { GAME_STATE, CELL_TYPE } from "./constants";

/**
 * Initialize game with default values
 * @param {int} order 
 * @param {int} size 
 */
function initializeGame(order, size) {
  // Get mine count based on complexity
  // TODO: Handling complexity in rest of the app
  let mineCount = 10;

  if (order === 16) {
    mineCount = 40;
  } else if (order === 24) {
    mineCount = 99;
  }

  // Set default values
  let minesRemaining = mineCount;
  let gameTime = 0;
  let mines = [];
  let gameState = GAME_STATE.INITIALIZED;
  let board = [];
  let gameInProgress = false;

  // Push default tiles to the board
  for (let i = 0; i < size; i++) {
    const tile = {
      id: i,
      value: " ",
      diffused: false,
      cleared: false,
      triggered: false,
      type: CELL_TYPE.NORMAL
    };
    board.push(tile);
  }

  return {
    mineCount,
    minesRemaining,
    gameTime,
    mines,
    gameState,
    board,
    gameInProgress
  };
}

/**
 * Get the neighboring values within bounds of a given cell
 * @param {int} cell 
 * @param {int} order 
 */
function getNeighbors(cell, order) {
  const neighbors = [-order, order];

  // Check first column
  if (cell % order !== 0) {
    neighbors.push(-(order + 1), -1, order - 1);
  }

  // Check last column
  if ((cell + 1) % order !== 0) {
    neighbors.push(order + 1, 1, -(order - 1));
  }

  return neighbors;
}

/**
 * Gets the formatted time given the ticks
 * @param {int} ticks 
 */
function getFormattedTime(ticks) {
  // Format minutes
  let minutes = parseInt(ticks / 60);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // Format seconds
  let seconds = ticks % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  // TODO: Format hours if required
  return `${minutes}:${seconds}`;
}

/**
 * Generate random set of mines and return
 * @param {int} mineCount 
 * @param {int} size 
 * @param {list} forbiddenTiles 
 */
function getMineLocations(mineCount, size, forbiddenTiles) {
  // Generate bombs
  let mineArray = new Array(mineCount).fill(-1);
  for (let index = 0; index < mineCount; index++) {
    let location = -1;
    while (mineArray.includes(location) || forbiddenTiles.includes(location)) {
      location = Math.floor(Math.random() * size);
    }

    mineArray[index] = location;
  }
  return mineArray;
}

/**
 * Clears a given tile
 * @param {int} tileId 
 * @param {object} board 
 */
function clearTile(tileId, board) {
  // Check if it is a mine, trigger if it is a bomb
  // Else clear tile
  let item = { ...board[tileId] };
  item.cleared = true;

  if (item.type === CELL_TYPE.MINE) {
    item.triggered = true;
  }
  board[tileId] = item;
  return board;
}

/**
 * Returns the game state except for a WIN state
 * If isValidation is true, returns the WIN state as well
 * @param {object} board 
 * @param {string} gameState 
 * @param {bool} isValidation 
 */
function getGameState(board, gameState, isValidation) {
  // let gameState = "";
  let mines = board.filter(x => x.cleared && x.type === CELL_TYPE.MINE);
  if (mines.length > 0) {
    gameState = GAME_STATE.BUST;
    return gameState;
  }

  // Check for win condition only if it is part of validation logic
  if (isValidation) {
    // Check for winning condition
    // If all the non-bombs are diffused, then the game is complete
    let nonMines = board.filter(x => !x.cleared && x.type !== CELL_TYPE.MINE);
    if (nonMines.length === 0) {
      gameState = GAME_STATE.WIN;
    }
  }
  return gameState;
}

/**
 * Reveals all tiles in the board
 * @param {object} board board
 */
function revealBoard(board) {
  board.map(x => (x.cleared = true));
  return board;
}

/**
 * Opens all the neighboring tiles of a given tile. Uses BFS
 * @param {int} tileId 
 * @param {object} board 
 * @param {int} size 
 * @param {int} order 
 */
function openOtherTiles(tileId, board, size, order) {
  let visited = [];
  let queue = [tileId];

  while (queue.length > 0) {
    let index = queue.pop();

    if (index < 0 || index > size - 1) {
      // Do nothing
    } else if (
      !board[index].diffused &&
      !(board[index].type === CELL_TYPE.MINE)
    ) {
      if (board[index].value !== " ") {
        board = clearTile(index, board);
      } else {
        board = clearTile(index, board);

        let neighbors = getNeighbors(index, order);
        neighbors.map(x => {
          if (
            !visited.includes(index + x) &&
            !(index + x < 0 || index + x > size - 1)
          ) {
            visited.push(index + x);
            queue.push(index + x);
          }
          return x;
        });
      }
    }
  }

  return board;
}

/**
 * Object that encapsulates all the methods in the file
 */
const common = {
  initializeGame: initializeGame,
  getMineLocations: getMineLocations,
  openOtherTiles: openOtherTiles,
  getNeighbors: getNeighbors,
  clearTile: clearTile,
  revealBoard: revealBoard,
  getGameState: getGameState,
  getFormattedTime:getFormattedTime
};
export default common;
