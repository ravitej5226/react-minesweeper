import { setGameLevel } from "./Game.actions";
import { SET_GAME_LEVEL } from "./Game.constants";

describe("actions", () => {
  it("should create an action to set game level", () => {
    const level = 8;
    const expectedAction = {
      type: SET_GAME_LEVEL,
      order: level
    };
    expect(setGameLevel(level)).toEqual(expectedAction);
  });
});
