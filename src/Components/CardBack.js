import React, { useEffect, useState } from "react";
import { back } from "../utils/cardPics";

export const CardBack = ({ drawFromDeck, count, deck }) => {
  const [isActive, setIsActive] = useState(false);
  const [autoCount, setAutoCount] = useState(0);

  const clickHandler = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        drawFromDeck();
        setAutoCount(autoCount + 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, autoCount, drawFromDeck]);

  return (
    <div>
      {count <= deck.length - 1 ? (
        <div>
          <button onClick={clickHandler}>click</button>
          <img
            className="cardBack noselect"
            src={back}
            alt=""
            onClick={drawFromDeck}
            draggable={false}
          />
        </div>
      ) : null}
    </div>
  );
};
