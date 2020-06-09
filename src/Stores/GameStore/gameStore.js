import { types } from 'mobx-state-tree';
import { GameModel } from 'Models';
import { GAME_STORE } from '../constants';

export const GameStore = types.model(GAME_STORE, {
  gameMap: types.map(GameModel),
});
