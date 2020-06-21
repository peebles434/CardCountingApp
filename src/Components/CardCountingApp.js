import React, { useState, useEffect, useInterval } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Stores/rootStore";
import { importedCardData } from "../utils/importedCardData";
import { CardCounter } from "./CardCounter";
import { ModeSelector } from "./ModeSelector";
import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { AnswerInputForm } from "./AnswerInputForm";
import { shuffle } from "../Logic/CardCountingAppLogic";
import { Link } from "@material-ui/core";
import "../App.css";

export const CardCountingApp = observer(() => {
  const { count, userAnswer, userTrueCountAnswer, setDeck } = useStore();

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
      <div className="countStats">
        <AnswerInputForm />
      </div>
      <br />
      <CardCounter deckForReset={deckForReset} />
      <div className="card_back">
        <CardBack />
      </div>
      <div className="card_front">
        <CardFront />
      </div>
    </div>
  );
});
