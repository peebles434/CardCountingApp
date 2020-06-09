import React from "react";
import { back } from "../utils/cardPics";

export const CardBack = ({ drawFromDeck, count, deck }) => {
  return (
    <div>
      {count <= deck.length - 1 ? (
        <div>
          <img className="cardBack" src={back} alt="" onClick={drawFromDeck} />
        </div>
      ) : null}
    </div>
  );
};
