import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { back } from "../utils/cardPics";
import { useStore } from "../Stores/rootStore";
import { timerDuration, randomDealerStop } from "../Logic/CardBackLogic";

export const CardBack = observer(() => {
  // Imported dealermode info from mobX
  const {
    dealerMode,
    dealerDifficulty,
    deck,
    count,
    drawFromDeck,
    suit,
  } = useStore();

  // States used by autodealer interval
  const [isActive, setIsActive] = useState(false);
  const [autoCount, setAutoCount] = useState(0);
  const [dealerStopPoint, setDealerStopPoint] = useState(20);

  const clickHandler = () => {
    // If click is to turn on timer, it draws 1st card instantly instead of waiting 1-2 seconds
    if (!isActive) {
      drawFromDeck();
      setAutoCount(1);
    }
    // Turns on timed auto-dealer
    setIsActive(!isActive);
  };

  // If suit is set to null by "Reset Deck" btn, it will deactivate the auto dealer
  useEffect(() => {
    if (suit === null) {
      setIsActive(false);
    }
  }, [suit]);

  // AutoDealing Function - uses timerDuration in CardBackLogic.js to set interval speed
  useEffect(() => {
    let interval = null;
    if (isActive && count < deck.length) {
      interval = setInterval(() => {
        drawFromDeck();
        setAutoCount(autoCount + 1);
      }, timerDuration(dealerDifficulty));
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, autoCount, drawFromDeck]);

  // TODO: Should Stop autodealer randomly based on CardBackLogic.js (10-40 by default)
  useEffect(() => {
    setDealerStopPoint(randomDealerStop());
  }, []);

  useEffect(() => {
    console.log(autoCount + " - " + dealerStopPoint);
    if (autoCount === dealerStopPoint) {
      setIsActive(!isActive);
    }
  }, [autoCount]);

  return (
    <div>
      {count <= deck.length - 1 ? (
        <div>
          <img
            className="cardBack noselect"
            src={back}
            alt=""
            onClick={dealerMode === "click" ? drawFromDeck : clickHandler}
            draggable={false}
          />
        </div>
      ) : null}
    </div>
  );
});
