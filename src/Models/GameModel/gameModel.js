import { types } from 'mobx-state-tree';
import { GAME_MODEL } from '../constants';
import { ChangeEvent } from 'react';

export const GameModel = types.model(GAME_MODEL, {
  count: types.number,
  deck: types.array,
  runningCount: types.number,
  userAnswer: types.number,
  chosenCard: {
    suit: types.string,
    face: types.number,
    image: types.image,
  },
  answerMode: {
    checkAnswerMode: types.boolean,
    correctAnswer: types.boolean,
  },
  gameMode: {
    numberOfDecks: types.number,
    dealerMode: types.string,
  },
});
