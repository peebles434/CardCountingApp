import React, { useState, useEffect, useInterval } from "react";
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
    dealerMode,
    setDealerMode,
    dealerDifficulty,
    setDealerDifficulty,
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
    if (x === 1) {
      setDealerMode("click");
    } else if (x > 1) {
      setDealerMode("auto");
    }
    if (x === 1) {
      setDealerDifficulty(null);
    } else if (x === 2) {
      setDealerDifficulty("easy");
    } else if (x === 3) {
      setDealerDifficulty("medium");
    } else if (x === 4) {
      setDealerDifficulty("hard");
    }
  };

  useEffect(() => {
    console.log(dealerMode);
    console.log(dealerDifficulty);
  }, [dealerMode, dealerDifficulty]);

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
    setDeck(shuffle(deck));
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
          updatedRunningCount={updatedRunningCount}
          setUpdatedRunningCount={setUpdatedRunningCount}
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
