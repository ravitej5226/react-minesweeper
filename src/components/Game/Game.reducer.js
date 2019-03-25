import { SET_GAME_LEVEL, GAME_STATE } from "./Game.constants";

const initialState = {
  board: null,
  mineCount: 10,
  order: 8,
  size: 64,
  mines: [],
  gameState: "STARTED",
  gameTime: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_LEVEL:
      let order = action.order;
      size = order * order;

      // TODO: Add logic if more levels are added
      mineCount = 10;

      if (order == 16) {
        mineCount = 40;
      } else if (order == 24) {
        mineCount = 99;
      }
      gameTime = 0;
      mines = [];
      gameState = GAME_STATE.INITIALIZED;

      return Object.assign({}, state, {
        size,
        order,
        mineCount,
        gameTime,
        mines,
        gameState
      });

    default:
      return state;
  }
};
