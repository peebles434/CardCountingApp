import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Stores/rootStore";
import { importedCardData } from "../utils/importedCardData";
import { CardCounter } from "./CardCounter";
import { ModeSelector } from "./ModeSelector";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { Button, Link } from "@material-ui/core";
import "../App.css";

export const CardCountingApp = observer(() => {
  const [chosenCard, setChosenCard] = useState({
    suit: null,
    face: "0",
    image: null,
  });
  const [deck, setDeck] = useState([]);
  const [answerMode, setAnswerMode] = useState({
    checkAnswerMode: false,
    correctAnswer: false,
  });

  const {
    count,
    setCount,
    setRunningCount,
    setTrueCount,
    userAnswer,
    setUserAnswer,
    userTrueCountAnswer,
    setUserTrueCountAnswer,
  } = useStore();

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

  // Shuffles 1 deck on initialization
  useEffect(() => {
    setDeck(shuffle(importedCardData));
  }, []);

  // Changes the number of decks and shuffles them all. Number passed in from slider in ModeSelector
  const updateNumberOfDecks = (x) => {
    let newDeck = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < 52; j++) {
        let singleDeck = importedCardData;
        newDeck.push(singleDeck[j]);
        newDeck = shuffle(newDeck);
      }
    }
    setDeck(newDeck);
  };

  // TODO: Need to wire up updateGameMode. Will change between clicking the deck and automatic dealing. Mode passed in from slider in ModeSelector
  const updateGameMode = (x) => {
    console.log(x);
  };

  // Increases count which displays new card. Function called in CardDisplay's onClick
  const drawFromDeck = () => {
    setCount(count + 1);
    setChosenCard(deck[count]);
    if (answerMode.checkAnswerMode === true) {
      setAnswerMode({
        checkAnswerMode: false,
        correctAnswer: false,
      });
      setUserAnswer(0);
      setUserTrueCountAnswer(0);
    }
  };

  // Starts game over on Reset button's onClick
  const resetDeck = () => {
    setCount(0);
    setRunningCount(0);
    setTrueCount(0);
    setChosenCard({
      suit: null,
      face: "0",
      image: null,
    });
    setDeck(shuffle(deck));
    setAnswerMode({
      checkAnswerMode: false,
      correctAnswer: false,
    });
    setUserAnswer("");
    setUserTrueCountAnswer("");
  };

  //   useInterval(() => {
  //     setCount(count + 1);
  //     setChosenCard(deck[count]);
  //   }, 2000);

  return (
    <div className="game-container">
      <div className="header">
        <h1 id="header__brand">Card Counting Trainer: Beat the Casino!</h1>
        <h4 id="header__instructions">
          Click the deck to flip the cards. See if your running count is
          accurate, below!
        </h4>
        <Link
          href="https://www.blackjackapprenticeship.com/how-to-count-cards/"
          color="primary"
          target="_blank"
        >
          Learn How to Count Cards Here
        </Link>
      </div>
      <div className="sliders">
        <ModeSelector
          count={count}
          updateNumberOfDecks={updateNumberOfDecks}
          updateGameMode={updateGameMode}
        />
      </div>
      <div className="stats">
        <CardCounter
          chosenCard={chosenCard}
          answerMode={answerMode}
          setAnswerMode={setAnswerMode}
          deck={deck}
          resetDeck={resetDeck}
        />
      </div>
      <div className="card_back">
        <CardBack
          drawFromDeck={drawFromDeck}
          count={count}
          chosenCard={chosenCard}
          deck={deck}
        />
      </div>
      <div className="card_front">
        <CardFront count={count} chosenCard={chosenCard} />
      </div>
    </div>
  );
});
