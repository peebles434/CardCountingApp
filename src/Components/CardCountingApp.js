import React, { useState } from "react";
import "../App.css";
import { importedCardData } from "../utils/importedCardData";
import { back } from "../utils/cardPics";
import { CardCounter } from "./CardCounter";

export const CardCountingApp = () => {
  const [chosenCard, setChosenCard] = useState({
    suit: null,
    face: "0",
    image: null,
  });
  const [count, setCount] = useState(0);

  function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }

  const deck = shuffle(importedCardData);

  const drawFromDeck = () => {
    setCount(count + 1);
    setChosenCard(deck[count]);
  };

  return (
    <div>
      <CardCounter chosenCard={chosenCard} count={count} />
      <div className="cardWrapper">
        {count <= 50 ? (
          <img
            className="playingCard"
            src={back}
            alt=""
            onClick={drawFromDeck}
          />
        ) : null}
        {count < 0 ? null : (
          <img className="playingCard" src={chosenCard.image} alt="test" />
        )}
      </div>
    </div>
  );
};
