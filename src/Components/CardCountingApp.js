import React, { useState, useEffect, useInterval } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Stores/rootStore";
import { importedCardData } from "../utils/importedCardData";
import { CardCounter } from "./CardCounter";
import { ModeSelector } from "./ModeSelector";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { shuffle } from "../Logic/CardCountingAppLogic";
import { Link } from "@material-ui/core";
import "../App.css";

export const CardCountingApp = observer(() => {
  const [chosenCard, setChosenCard] = useState({
    suit: null,
    face: "0",
    image: null,
  });
  const [answerMode, setAnswerMode] = useState({
    checkAnswerMode: false,
    correctAnswer: false,
  });

  // TODO: See why runningCount <p> tags lag behind unless set up with this useState.
  const [updatedRunningCount, setUpdatedRunningCount] = useState(0);

  const {
    count,
    setCount,
    setRunningCount,
    setTrueCount,
    userAnswer,
    setUserAnswer,
    userTrueCountAnswer,
    setUserTrueCountAnswer,
    deck,
    setDeck,
  } = useStore();

  const [deckForReset, setDeckForReset] = useState();

  // Shuffles 1 deck on initialization
  useEffect(() => {
    let newDeck = shuffle(importedCardData);
    setDeck(newDeck);
    setDeckForReset(newDeck);
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
    setDeckForReset(newDeck);
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
      setUserAnswer("");
      setUserTrueCountAnswer("");
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
    setDeck(shuffle(deckForReset));
    setAnswerMode({
      checkAnswerMode: false,
      correctAnswer: false,
    });
    setUserAnswer("");
    setUserTrueCountAnswer("");
    setUpdatedRunningCount(0);
  };

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
        <ModeSelector updateNumberOfDecks={updateNumberOfDecks} />
      </div>
      <div className="stats">
        <CardCounter
          chosenCard={chosenCard}
          answerMode={answerMode}
          setAnswerMode={setAnswerMode}
          resetDeck={resetDeck}
          setUpdatedRunningCount={setUpdatedRunningCount}
        />
      </div>
      <div className="card_back">
        <CardBack drawFromDeck={drawFromDeck} chosenCard={chosenCard} />
      </div>
      <div className="card_front">
        <CardFront chosenCard={chosenCard} />
      </div>
    </div>
  );
});
