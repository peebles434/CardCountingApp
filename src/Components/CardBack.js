import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { back } from "../utils/cardPics";
import { useStore } from "../Stores/rootStore";
import { timerDuration } from "../Logic/CardBackLogic";

export const CardBack = observer(({ drawFromDeck, count, deck }) => {
  const { viewDealerMode, viewDealerDifficulty } = useStore();

  const [isActive, setIsActive] = useState(false);
  const [autoCount, setAutoCount] = useState(0);

  const clickHandler = () => {
    if (!isActive) {
      drawFromDeck();
    }
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        drawFromDeck();
        setAutoCount(autoCount + 1);
      }, timerDuration(viewDealerDifficulty));
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, autoCount, drawFromDeck]);

  return (
    <div>
      {count <= deck.length - 1 ? (
        <div>
          <img
            className="cardBack noselect"
            src={back}
            alt=""
            onClick={viewDealerMode === "click" ? drawFromDeck : clickHandler}
            draggable={false}
          />
        </div>
      ) : null}
    </div>
  );
});
