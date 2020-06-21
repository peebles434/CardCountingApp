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
  .views((self) => ({}))
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
    setChosenCard(value) {
      self.suit = value.suit;
      self.face = value.face;
      self.image = value.image;
    },
    setAnswerMode(value) {
      self.checkAnswerMode = value.checkAnswerMode;
      self.correctAnswer = value.correctAnswer;
    },
    setDeck(value) {
      self.deck = value;
    },
  }))
  .actions((self) => ({
    // Provides different game modes based on slider mark values
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
  .actions((self) => ({
    // Increases count which displays new card. Function called in CardDisplay's onClick
    drawFromDeck() {
      self.count = self.count + 1;
      self.suit = self.deck[self.count].suit;
      self.face = self.deck[self.count].face;
      self.image = self.deck[self.count].image;
      if (self.checkAnswerMode === true) {
        self.checkAnswerMode = false;
        self.correctAnswer = false;
      }
      self.userAnswer = "";
      self.userTrueCountAnswer = "";
    },
    // Starts game over on Reset button's onClick
    resetDeck(deckForReset, shuffle) {
      self.count = 0;
      self.runningCount = 0;
      self.trueCount = 0;
      self.suit = null;
      self.face = "0";
      self.image = null;
      self.deck = shuffle(deckForReset);
      self.checkAnswerMode = false;
      self.correctAnswer = false;
      self.userAnswer = "";
      self.userTrueCountAnswer = "";
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
