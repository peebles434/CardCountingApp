import { useContext, createContext } from 'react';
import {
  types,
  Instance,
  onSnapshot,
  cast,
  getEnv as _getEnv,
  IAnyStateTreeNode,
} from 'mobx-state-tree';
import { GAME_STORE } from './constants';
import { GameStore } from './GameStore';

const RootStoreModel = types.model(ROOT_STORE, {
  [GAME_STORE]: types.optional(GameStore, {}),
});
