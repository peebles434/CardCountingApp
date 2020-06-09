import React, { useState, useEffect } from 'react';
import '../App.css';
import { importedCardData } from '../utils/importedCardData';
import { CardCounter } from './CardCounter';
import { useInterval } from '../hooks/useInterval';
import { ModeSelector } from './ModeSelector';
import { Button, Link } from '@material-ui/core';
import { CardDisplay } from './CardDisplay';

export const CardCountingApp = () => {
  const [chosenCard, setChosenCard] = useState({
    suit: null,
    face: '0',
    image: null,
  });
  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState([]);
  const [runningCount, setRunningCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const [userTrueCountAnswer, setUserTrueCountAnswer] = useState(0);
  const [answerMode, setAnswerMode] = useState({
    checkAnswerMode: false,
    correctAnswer: false,
  });

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
      face: '0',
      image: null,
    });
    setDeck(shuffle(deck));
    setAnswerMode({
      checkAnswerMode: false,
      correctAnswer: false,
    });
    setUserAnswer(0);
    setUserTrueCountAnswer(0);
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
        <Link
          href="https://www.blackjackapprenticeship.com/how-to-count-cards/"
          color="primary"
          target="_blank"
        >
          Learn How to Count Cards Here
        </Link>
        <ModeSelector
          count={count}
          updateNumberOfDecks={updateNumberOfDecks}
          updateGameMode={updateGameMode}
        />
        <Button
          variant="outlined"
          onClick={resetDeck}
          disabled={count > 0 ? false : true}
        >
          Reset Deck
        </Button>
        <CardCounter
          userTrueCountAnswer={userTrueCountAnswer}
          setUserTrueCountAnswer={setUserTrueCountAnswer}
          trueCount={trueCount}
          setTrueCount={setTrueCount}
          runningCount={runningCount}
          setRunningCount={setRunningCount}
          chosenCard={chosenCard}
          count={count}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          answerMode={answerMode}
          setAnswerMode={setAnswerMode}
          deck={deck}
        />
      </div>
      <CardDisplay
        drawFromDeck={drawFromDeck}
        count={count}
        chosenCard={chosenCard}
        deck={deck}
      />
    </div>
  );
};
