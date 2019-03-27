import {
  GENERATE_BOARD,
  TILE_CLICK,
  DIFFUSE_MINE,
  CLEAR_NEIGHBORS,
  REVEAL_ONE_MINE,
  VALIDATE
} from "./Board.constants";
import {
  generateBoard,
  onClearNeighbors,
  onDiffuseMine,
  onRevealOneMine,
  onTileClicked,
  onValidate
} from "./Board.actions";

describe("actions", () => {
  it("should create an action to generate board", () => {
    const tileId = 8;
    const expectedAction = {
      type: GENERATE_BOARD,
      tileId: tileId
    };
    expect(generateBoard(tileId)).toEqual(expectedAction);
  });

  it("should create an action to check tile click", () => {
    const tileId = 8;
    const expectedAction = {
      type: TILE_CLICK,
      tileId: tileId
    };
    expect(onTileClicked(tileId)).toEqual(expectedAction);
  });

  it("should create an action to diffuse mine", () => {
    const tileId = 8;
    const expectedAction = {
      type: DIFFUSE_MINE,
      tileId: tileId
    };
    expect(onDiffuseMine(tileId)).toEqual(expectedAction);
  });

  it("should create an action to clear neighbors", () => {
    const tileId = 8;
    const expectedAction = {
      type: CLEAR_NEIGHBORS,
      tileId: tileId
    };
    expect(onClearNeighbors(tileId)).toEqual(expectedAction);
  });

  it("should create an action to reveal a mine", () => {
    const expectedAction = {
      type: REVEAL_ONE_MINE
    };
    expect(onRevealOneMine()).toEqual(expectedAction);
  });

  it("should create an action to validate", () => {
    const expectedAction = {
      type: VALIDATE
    };
    expect(onValidate()).toEqual(expectedAction);
  });
});
