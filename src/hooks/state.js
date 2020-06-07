import { useState } from "react";

export const useAppState = () => {
  // STATE
  const [state, setState] = useState({
    count: 0,
    deck: [],
    runningCount: 0,
    trueCount: 0,
    userAnswer: 0,
    chosenCard: {
      suit: null,
      face: "0",
      image: null,
    },
    answerMode: {
      checkAnswerMode: false,
      correctAnswer: false,
    },
    gameMode: {
      numberOfDecks: 1,
      dealerMode: "click",
    },
  });

  //   STATE UPDATERS
  const setCount = (x) => {
    setState((oldState) => ({
      ...oldState,
      count: x,
    }));
  };
  const setDeck = (x) => {
    setState((oldState) => ({
      ...oldState,
      deck: x,
    }));
  };
  const setRunningCount = (x) => {
    setState((oldState) => ({
      ...oldState,
      runningCount: x,
    }));
  };
  const setTrueCount = (x) => {
    setState((oldState) => ({
      ...oldState,
      trueCount: x,
    }));
  };
  const setUserAnswer = (x) => {
    setState((oldState) => ({
      ...oldState,
      userAnswer: x,
    }));
  };
  const setChosenCard = (x) => {
    console.log(x);
    setState((oldState) => ({
      ...oldState,
      chosenCard: x,
    }));
  };
  const setAnswerMode = (x) => {
    setState((oldState) => ({
      ...oldState,
      answerMode: x,
    }));
  };
  const setGameMode = (x) => {
    setState((oldState) => ({
      ...oldState,
      gameMode: x,
    }));
  };

  return {
    state,
    setCount,
    setDeck,
    setRunningCount,
    setTrueCount,
    setUserAnswer,
    setChosenCard,
    setAnswerMode,
    setGameMode,
  };
};
