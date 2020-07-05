import { types } from "mobx-state-tree";

export const CardModel = types.model({
  id: types.identifier,
  suit: types.string,
  face: types.string,
  image: types.string,
});
