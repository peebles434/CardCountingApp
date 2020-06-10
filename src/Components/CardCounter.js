import React, { useEffect, useState } from "react";
import { useStore } from "../Stores/rootStore";
import { AnswerInputForm } from "./AnswerInputForm";
import { Button } from "@material-ui/core";
import "../App.css";

export const CardCounter = ({
  chosenCard,
  answerMode,
  setAnswerMode,
  deck,
  resetDeck,
  updatedRunningCount,
  setUpdatedRunningCount,
}) => {
  const {
    count,
    runningCount,
    setRunningCount,
    trueCount,
    setTrueCount,
  } = useStore();

  // Checks the chosen card and determines if it is a low card, medium card, or high card
  useEffect(() => {
    const lowCards = /^(2|3|4|5|6)$/;
    const highCards = /^(10|J|Q|K|A)$/;
    if (chosenCard.face.match(lowCards)) {
      setRunningCount(runningCount + 1);
      setTrueCount(Math.round((runningCount + 1) / roundDecksToTheQuarter()));
      setUpdatedRunningCount(runningCount + 1);
    } else if (chosenCard.face.match(highCards)) {
      setRunningCount(runningCount - 1);
      setTrueCount(Math.round((runningCount - 1) / roundDecksToTheQuarter()));
      setUpdatedRunningCount(runningCount - 1);
    }
  }, [chosenCard.face, chosenCard.suit]);

  // Finds decks remaining and rounds it UP to the nearest .25
  const roundDecksToTheQuarter = () => {
    let decksRemaining = deck.length / 52 - count / 52;
    let roundedDecksRemaining = Math.ceil(decksRemaining / 0.25) * 0.25;
    return roundedDecksRemaining;
  };

  return (
    <div>
      <AnswerInputForm answerMode={answerMode} setAnswerMode={setAnswerMode} />
      <br />
      <Button
        variant="outlined"
        onClick={resetDeck}
        disabled={count > 0 ? false : true}
      >
        Reset Deck
      </Button>
      <h2>Decks Remaining: {roundDecksToTheQuarter()} </h2>
      <p>(To be removed) Running Count: {updatedRunningCount}</p>
      <p>(To be removed) True Count: {trueCount}</p>
    </div>
  );
};
