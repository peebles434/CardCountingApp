import { types } from "mobx-state-tree";
import { useMemo } from "react";
import { CardModel } from "../Models/CardModel/cardModel";
import { DefaultGameStore } from "../Models/GameModel/defaultGameStore";

const RootStore = types
  .model({
    count: types.number,
    deck: types.array(CardModel),
    runningCount: types.number,
    userAnswer: types.number,
    suit: types.maybeNull(types.string),
    face: types.number,
    image: types.maybeNull(types.string),
    checkAnswerMode: types.boolean,
    correctAnswer: types.boolean,
    numberOfDecks: types.number,
    dealerMode: types.string,
  })
  .volatile((self) => ({
    answerDraft: {},
  }))
  .actions((self) => ({
    setCount(value) {
      self.count = value;
    },
    setRunningCount(value) {
      self.runningCount = value;
    },
  }))
  // TODO: Needs to be updated, doesn't connect correctly
  .actions((self) => ({
    setDeck(value) {
      self.deck = value;
    },
    setChosenCard(value) {
      self.suit = value.suit;
      self.face = value.face;
      self.image = value.image;
    },
  }));

let _store;
export const useStore = () => {
  const store = useMemo(() => {
    if (!_store) _store = RootStore.create(DefaultGameStore);
    return _store;
  }, []);
  return store;
};
