import React from "react";
import { back } from "../utils/cardPics";
import { useAppState } from "../hooks/state";

export const CardDisplay = ({ drawFromDeck, count, deck, chosenCard }) => {
  const { state } = useAppState();

  return (
    <div className="card-container">
      {count <= deck.length - 1 ? (
        <div className="card-item-1">
          <img className="cardBack" src={back} alt="" onClick={drawFromDeck} />
        </div>
      ) : null}
      {count < 0 ? null : (
        <div className="card-item-2">
          <img className="cardFront" src={chosenCard.image} alt="" />
        </div>
      )}
    </div>
  );
};
