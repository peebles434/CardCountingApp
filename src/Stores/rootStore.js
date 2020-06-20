import { types } from "mobx-state-tree";
import { useMemo } from "react";
import { CardModel } from "../Models/CardModel/cardModel";
import { DefaultGameStore } from "../Models/GameModel/defaultGameStore";

const RootStore = types
  .model({
    count: types.number,
    deck: types.array(CardModel),
    runningCount: types.number,
    trueCount: types.number,
    userAnswer: types.string,
    userTrueCountAnswer: types.string,
    suit: types.maybeNull(types.string),
    face: types.maybeNull(types.string),
    image: types.maybeNull(types.string),
    checkAnswerMode: types.boolean,
    correctAnswer: types.boolean,
    numberOfDecks: types.number,
    dealerMode: types.string,
    dealerDifficulty: types.maybeNull(types.string),
  })
  .volatile((self) => ({
    answerDraft: {},
  }))
  .views((self) => ({
    get updatedRunningCount() {
      return self.runningCount;
    },
    get viewDealerMode() {
      return self.dealerMode;
    },
    get viewDealerDifficulty() {
      return self.dealerDifficulty;
    },
  }))
  .actions((self) => ({
    setCount(value) {
      self.count = value;
    },
    setRunningCount(value) {
      self.runningCount = value;
    },
    setTrueCount(value) {
      self.trueCount = value;
    },
    setUserAnswer(value) {
      self.userAnswer = value;
    },
    setUserTrueCountAnswer(value) {
      self.userTrueCountAnswer = value;
    },
  }))
  .actions((self) => ({
    updateGameMode(x) {
      if (x === 1) {
        self.dealerMode = "click";
      } else if (x > 1) {
        self.dealerMode = "auto";
      }
      if (x === 1) {
        self.dealerDifficulty = null;
      } else if (x === 2) {
        self.dealerDifficulty = "easy";
      } else if (x === 3) {
        self.dealerDifficulty = "medium";
      } else if (x === 4) {
        self.dealerDifficulty = "hard";
      }
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
