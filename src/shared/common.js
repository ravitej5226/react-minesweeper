import {GAME_STATE,CELL_TYPE} from './constants'

function initializeGame(order,size){
  let mineCount = 10;

      if (order === 16) {
        mineCount = 40;
      } else if (order === 24) {
        mineCount = 99;
      }
      let minesRemaining = mineCount;
      let gameTime = 0;
      let mines = [];
      let gameState = GAME_STATE.INITIALIZED;
      let board = [];
      for (let i = 0; i < size; i++) {
        const tile = {
          id: i,
          value: " ",
          diffused: false,
          cleared: false,
          triggered: false,
          type: CELL_TYPE.NORMAL
        };
        board.push(tile)
      }
      let gameStart = false

      return {
        mineCount,
        minesRemaining,
        gameTime,
        mines,
        gameState,
        board,
        gameStart
      }
}
function getNeighbors(cell,order){
    const neighbors = [-8, 8];
        // Check first column
        if (cell % order !== 0) {
          neighbors.push(-9, -1, 7);
         // console.log(neighbors);
        }

        // Check last column
        if ((cell + 1) % order !== 0) {
          neighbors.push(9, 1, -7);
        //  console.log(neighbors);
        }
        console.log(cell,order,neighbors)
        return neighbors;
}

export function getFormattedTime(ticks){
  // Format minutes
  let minutes=parseInt(ticks/60);

  if(minutes<10){
    minutes=`0${minutes}`;
  }
  // Format seconds
let seconds=ticks%60
if(seconds<10){
  seconds=`0${seconds}`
}
  // TODO: Format hours if required
  return  `${minutes}:${seconds}`
}

function placeBombs(mineCount, size,forbiddenTiles) {
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

function clearTile(tileId, board) {
  // Check if it is a bomb
  // Else clear tile
  let item = { ...board[tileId] };
  item.cleared = true;

  if (item.value === "B") {
    item.triggered = true;
  }
  board[tileId] = item;
  return board;

  
}

function getGameState(board, gameState,isValidation) {
  // let gameState = "";
  let mines = board.filter(x => x.cleared && x.value === "B");
  if (mines.length > 0) {
    gameState = GAME_STATE.BUST;
    return gameState;
  }

  // Check for win condition only if it is part of validation logic
  if(isValidation)
  {
  // Check for winning condition
  // If all the non-bombs are diffused, then the game is complete
  let nonMines = board.filter(x => !x.cleared && x.value !== "B");
  if (nonMines.length === 0) {
    gameState = GAME_STATE.WIN;
  }
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
  
  while (queue.length > 0) {
    let index = queue.pop();

    if (index < 0 || index > size - 1) {
      // return board;
      //continue;
    } else if (!board[index].diffused && !(board[index].value === "B")) {
      if (board[index].value !== " ") {
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
          return x;
        });
        console.log("done loading queue");
        console.log(`queue: ${queue}`);
      }
    }
  }
  console.log(`visited: ${visited}`);
  return board;
}

const common={
  initializeGame:initializeGame,
  placeBombs:placeBombs,
  openOtherTiles:openOtherTiles,
  getNeighbors:getNeighbors,
  clearTile:clearTile,
  revealBoard:revealBoard,
  getGameState:getGameState
}
export default common;