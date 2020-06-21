import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../Stores/rootStore";
import { shuffle } from "../Logic/CardCountingAppLogic";
import { Button } from "@material-ui/core";
import "../App.css";

export const CardCounter = observer(({ deckForReset }) => {
  const {
    count,
    runningCount,
    setRunningCount,
    trueCount,
    setTrueCount,
    deck,
    suit,
    face,
    resetDeck,
  } = useStore();

  const [runningCountTesting, setRunningCountTesting] = useState(false);
  const [trueCountTesting, setTrueCountTesting] = useState(false);

  const toggleRunningCount = () => {
    setRunningCountTesting(!runningCountTesting);
  };

  const toggleTrueCount = () => {
    setTrueCountTesting(!trueCountTesting);
  };

  // Checks the chosen card and determines if it is a low card, medium card, or high card
  useEffect(() => {
    if (face) {
      const lowCards = /^(2|3|4|5|6)$/;
      const highCards = /^(10|J|Q|K|A)$/;
      if (face.match(lowCards)) {
        setRunningCount(runningCount + 1);
        setTrueCount(Math.round((runningCount + 1) / roundDecksToTheQuarter()));
      } else if (face.match(highCards)) {
        setRunningCount(runningCount - 1);
        setTrueCount(Math.round((runningCount - 1) / roundDecksToTheQuarter()));
      }
    }
  }, [face, suit]);

  // Finds decks remaining and rounds it UP to the nearest .25
  const roundDecksToTheQuarter = () => {
    let decksRemaining = deck.length / 52 - count / 52;
    let roundedDecksRemaining = Math.ceil(decksRemaining / 0.25) * 0.25;
    return roundedDecksRemaining;
  };

  const clickHandler = () => {
    resetDeck(deckForReset, shuffle);
  };

  return (
    <div className="deckStats">
      <h2>Decks Remaining: {roundDecksToTheQuarter()} </h2>
      <br />
      <p className="hideCounts" onClick={toggleRunningCount}>
        Click <b>here</b> to see running count for testing:{" "}
        {runningCountTesting ? runningCount : ""}
      </p>
      <p className="hideCounts" onClick={toggleTrueCount}>
        Click <b>here</b> to see true count for testing:{" "}
        {trueCountTesting ? (isNaN(trueCount) ? 0 : trueCount) : ""}
      </p>
      <br />
      <Button
        variant="outlined"
        onClick={clickHandler}
        disabled={count > 0 ? false : true}
      >
        Reset Deck
      </Button>
    </div>
  );
});
