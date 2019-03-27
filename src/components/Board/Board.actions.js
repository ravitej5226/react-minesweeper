import {
  GENERATE_BOARD,
  TILE_CLICK,
  DIFFUSE_MINE,
  CLEAR_NEIGHBORS,
  REVEAL_ONE_MINE,
  VALIDATE
} from "./Board.constants";
export const generateBoard = tileId => ({
  type: GENERATE_BOARD,
  tileId: tileId
});

export const onTileClicked = tileId => ({
  type: TILE_CLICK,
  tileId: tileId
});

export const onDiffuseMine = tileId => ({
  type: DIFFUSE_MINE,
  tileId: tileId
});

export const onClearNeighbors = tileId => ({
  type: CLEAR_NEIGHBORS,
  tileId: tileId
});

export const onRevealOneMine = () => ({
  type: REVEAL_ONE_MINE
});

export const onValidate = () => ({
  type: VALIDATE
});
