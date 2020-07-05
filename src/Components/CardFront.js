import React from "react";
import { observer } from "mobx-react";
import { RootStore } from "../Stores/rootStore";

export const CardFront = observer(() => {
  const { count, chosenCard } = RootStore;
  if (!chosenCard) return null;
  return (
    <div>
      {count < 0 ? null : (
        <div>
          <img
            className="cardFront noselect"
            src={chosenCard.image}
            alt=""
            draggable={false}
          />
        </div>
      )}
    </div>
  );
});
