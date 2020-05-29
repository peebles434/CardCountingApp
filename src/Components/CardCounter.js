import React, { useState, useEffect } from "react";
import "../App.css";
import { AnswerInputForm } from "./AnswerInputForm";

export const CardCounter = ({
  runningCount,
  setRunningCount,
  chosenCard,
  count,
  userAnswer,
  setUserAnswer,
  answerMode,
  setAnswerMode,
  deck,
}) => {
  useEffect(() => {
    const lowCards = /^(2|3|4|5|6)$/;
    const highCards = /^(10|J|Q|K|A)$/;
    if (chosenCard.face.match(lowCards)) {
      setRunningCount(runningCount + 1);
    } else if (chosenCard.face.match(highCards)) {
      setRunningCount(runningCount - 1);
    }
  }, [chosenCard.face, chosenCard.suit]);

  return (
    <div>
      <AnswerInputForm
        runningCount={runningCount}
        count={count}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        answerMode={answerMode}
        setAnswerMode={setAnswerMode}
      />
      <p> (To be removed) Running Count: {runningCount}</p>
      <p>(To be removed) Number of Cards: {count}</p>
      <h2>Number of Decks: {deck.length / 52}</h2>
      <h2>Decks Remaining: {deck.length / 52 - count / 52} </h2>
    </div>
  );
};
