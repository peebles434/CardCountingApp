import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { importedCardData } from '../utils/importedCardData';
import { back } from '../utils/cardPics';
import { CardCounter } from './CardCounter';
import { UserInputForm } from './UserInputForm';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const CardCountingApp = () => {
  const [chosenCard, setChosenCard] = useState({
    suit: null,
    face: '0',
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

  //   useInterval(() => {
  //     setCount(count + 1);
  //     setChosenCard(deck[count]);
  //   }, 2000);

  return (
    <div>
      <UserInputForm />
      <CardCounter chosenCard={chosenCard} count={count} />
      <div className="card-container">
        {count <= 50 ? (
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
