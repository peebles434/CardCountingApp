import { useState } from "react";

// TODO: Needs to be connected to Components. May need to separate out.
export const useAppState = () => {
  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState([]);
  const [runningCount, setRunningCount] = useState(0);
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
  return [
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
  ];
};
