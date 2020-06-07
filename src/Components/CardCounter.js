import React, { useEffect } from "react";
import "../App.css";
import { AnswerInputForm } from "./AnswerInputForm";
import { useAppState } from "../hooks/state";

export const CardCounter = ({
  userTrueCountAnswer,
  setUserTrueCountAnswer,
  count,
  userAnswer,
  setUserAnswer,
  answerMode,
  setAnswerMode,
  deck,
  chosenCard,
}) => {
  const { state, setRunningCount, setTrueCount } = useAppState();

  // TODO: Update reset deck button handler to also update truecount to zero
  // Checks the chosen card and determines if it is a low card, medium card, or high card
  useEffect(() => {
    const lowCards = /^(2|3|4|5|6)$/;
    const highCards = /^(10|J|Q|K|A)$/;
    if (chosenCard.face.match(lowCards)) {
      setRunningCount(state.runningCount + 1);
      setTrueCount(
        Math.round((state.runningCount + 1) / roundDecksToTheQuarter())
      );
    } else if (chosenCard.face.match(highCards)) {
      setRunningCount(state.runningCount - 1);
      setTrueCount(
        Math.round((state.runningCount - 1) / roundDecksToTheQuarter())
      );
    }
  }, [chosenCard.face, chosenCard.suit]);

  // Finds decks remaining and rounds it UP to the nearest .25
  const roundDecksToTheQuarter = () => {
    let decksRemaining = deck.length / 52 - count / 52;
    let roundedDecksRemaining = Math.ceil(decksRemaining / 0.25) * 0.25;
    return roundedDecksRemaining;
  };

  // roundedDeckRemaining, runningCount, Math.round(runningCount / roundedDeckRemaining)

  return (
    <div>
      <AnswerInputForm
        count={count}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        userTrueCountAnswer={userTrueCountAnswer}
        setUserTrueCountAnswer={setUserTrueCountAnswer}
        answerMode={answerMode}
        setAnswerMode={setAnswerMode}
      />
      <h2>Decks Remaining: {roundDecksToTheQuarter()} </h2>
      <p>(To be removed) Running Count: {state.runningCount}</p>
      <p>(To be removed) True Count: {state.trueCount}</p>
    </div>
  );
};
