import { GENERATE_BOARD, DIFFUSE_MINE, TILE_CLICK } from './components/Board/Board.constants';
import { getNeighbors } from './shared/common';
import { SET_GAME_LEVEL } from "./components/Game/Game.constants";

import { GAME_STATE } from './shared/constants'

const initialState = {
    board: null,
    mineCount: 10,
    minesRemaining: 0,
    order: 8,
    size: 64,
    mines: [],
    gameState: "STARTED",
    gameTime: 0
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
    return mineArray
}

function clearTile(tileId, board) {
    // Check if it is a bomb
    // Else clear tile
    let item = { ...board[tileId] }
    item.cleared = true
    board[tileId] = item;

    let gameState = ''
    if (board[tileId].value == 'B') {
        gameState = GAME_STATE.BUST

        board[tileId].triggered = true
        board = revealBoard(board);
        return { board, gameState };
    }

    // Check for winning condition
    // If all the non-bombs are diffused, then the game is complete
    let nonMines = board.filter(x => !x.cleared && x.value !== "B")
    if (nonMines.length == 0) {
        gameState = GAME_STATE.WIN
    }
    return { board, gameState };
}

function revealBoard(board) {

    board.map(x => x.cleared = true)
    return board;
}

function openOtherTiles(tileId, board, size, order) {

    let visited = []
    let queue = [tileId]
    let boardState={}
    let gameState=""
    while (queue.length > 0) {
        let index = queue.pop()

        if (index < 0 || index > size - 1) {
           // return board;
           continue
        }
        if (!board[index].diffused && !(board[index].value == 'B')) {
            if (board[index].value != " ") {
                boardState=  clearTile(index, board);
                board=boardState.board
                gameState=boardState.gameState

            }
            else {
                boardState=  clearTile(index, board);
                board=boardState.board
                gameState=boardState.gameState
                console.log('getting neighbors')
                let neighbors = getNeighbors(index, order);
                neighbors.map(x => {
                    if (!visited.includes(index + x)) {

                        queue.push(index + x)
                    }

                })
                console.log('done loading queue')
            }
        }
        visited.push(index)
        


    }
    console.log(`visited: ${visited}`)
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

        case GENERATE_BOARD:
            let board = [];
            const previousState = { ...state }
            let mineArray = placeBombs(previousState.mineCount, previousState.size);
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
                        if (i + x > 0 && mineArray.includes(i + x)) {
                            count++;
                        }
                    });

                    if (count > 0) {
                        tile.value = count;
                    }
                }

                board.push(tile);
            }

            return Object.assign({}, state, { board: board, mines: mineArray });

        case TILE_CLICK:
            {
                let gameState = GAME_STATE.RUNNING
                let tileId = action.tileId
                let board = Object.assign([], state.board)
                let size = state.size
                let order = state.order
                // TODO: check for bomb
                let boardState = clearTile(tileId, board, size);
                board = boardState.board
                gameState = boardState.gameState
                const visited = []
                board=openOtherTiles(tileId, board, size, order);

                return Object.assign({}, state, { board: board, gameState });
            }
        case DIFFUSE_MINE:
        {
            let tileId = action.tileId
            let board = Object.assign([], state.board)
            let size = state.size
            let order = state.order
            if (!board[tileId].cleared) {
                board[tileId].diffused = !board[tileId].diffused;                
            }
            else if (board[tileId].value != " ") {
               
                // TODO: DO not open if value does not equals neighboring diffuses
                const neighbors = getNeighbors(tileId, order);

                // Check the diffuses in the neighbors
                let diffusedCount = 0
                // If the diffused tiles are equal to or greater than value, open the neighbors
                neighbors.map(x => {
                    if (x + tileId < 0 || x + tileId > size - 1) {
                        return;
                    }
                    if (board[tileId + x].diffused) {
                        diffusedCount++;
                    }
                })

                if (diffusedCount >= board[tileId].value) {
                    // Open the neighbors
                    neighbors.map(x => {
                        if (x + tileId < 0 || x + tileId > size - 1) {
                            return;
                        }
                        else {
                            if (!board[tileId + x].diffused) {
                                let boardState=clearTile(tileId + x, board)
                                board=boardState.board
                                gameState=board.gameState
                            }
                        }
                    })
                }

               
            }
            return Object.assign({}, state, { board});
            }
        default:
            return state;
    }
};
