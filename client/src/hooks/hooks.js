import { useState } from "react";

// TODO: Update State with hooks and oldState
// TODO: Use spread operator and function in the hook file to act basically as reducer
export const useAppState = () => {
  const [state, setState] = useState({
    count: 0,
    deck: [],
  });

  const updateCount = (count) => {
    setState((oldState) => ({
      count,
      ...oldState,
    }));
  };

  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState([]);
  const [runningCount, setRunningCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [chosenCard, setChosenCard] = useState({
    suit: null,
    face: "0",
    image: null,
  });
  const [answerMode, setAnswerMode] = useState({
    checkAnswerMode: false,
    correctAnswer: false,
  });
  const [gameMode, setGameMode] = useState({
    numberOfDecks: 1,
    dealerMode: "click",
  });
  return {
    count,
    setCount,
    deck,
    setDeck,
    runningCount,
    setRunningCount,
    userAnswer,
    setUserAnswer,
    chosenCard,
    setChosenCard,
    answerMode,
    setAnswerMode,
    gameMode,
    setGameMode,
    setTrueCount,
    trueCount,
  };
};
