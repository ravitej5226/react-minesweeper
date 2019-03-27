import { SET_GAME_LEVEL } from "./Game.constants";

export const setGameLevel = order => ({
  type: SET_GAME_LEVEL,
  order: order
});
