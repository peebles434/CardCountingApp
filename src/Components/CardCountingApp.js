import React, { useState, useEffect } from "react";
import "../App.css";
import { importedCardData } from "../utils/importedCardData";
import { back } from "../utils/cardPics";
import { CardCounter } from "./CardCounter";
import { useInterval } from "../hooks/useInterval";
import { ModeSelector } from "./ModeSelector";
import Button from "@material-ui/core/button";

export const CardCountingApp = () => {
  const [chosenCard, setChosenCard] = useState({
    suit: null,
    face: "0",
    image: null,
  });
  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState([]);
  const [runningCount, setRunningCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [answerMode, setAnswerMode] = useState({
    checkAnswerMode: false,
    correctAnswer: false,
  });

  useEffect(() => {
    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
    setDeck(shuffle(importedCardData));
  }, []);

  const drawFromDeck = () => {
    setCount(count + 1);
    setChosenCard(deck[count]);
    if (answerMode.checkAnswerMode === true) {
      setAnswerMode({
        checkAnswerMode: false,
        correctAnswer: false,
      });
      setUserAnswer(0);
    }
  };

  const resetDeck = () => {
    setCount(0);
    setChosenCard({
      suit: null,
      face: "0",
      image: null,
    });
    setRunningCount(0);
  };

  //   useInterval(() => {
  //     setCount(count + 1);
  //     setChosenCard(deck[count]);
  //   }, 2000);

  return (
    <div>
      <div className="game-container">
        <h1>Card Counting Trainer: Beat the Casino!</h1>
        <h4>
          Click the deck to flip the cards. See if your running count is
          accurate, below!
        </h4>
        <ModeSelector count={count} />
        <Button
          variant="outlined"
          onClick={resetDeck}
          disabled={count > 0 ? false : true}
        >
          Reset Deck
        </Button>
        <CardCounter
          runningCount={runningCount}
          setRunningCount={setRunningCount}
          chosenCard={chosenCard}
          count={count}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          answerMode={answerMode}
          setAnswerMode={setAnswerMode}
        />
      </div>

      <div className="card-container">
        {count <= 51 ? (
          <div className="card-item-1">
            <img
              className="cardBack"
              src={back}
              alt=""
              onClick={drawFromDeck}
            />
          </div>
        ) : null}
        {count < 0 ? null : (
          <div className="card-item-2">
            <img className="cardFront" src={chosenCard.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};
