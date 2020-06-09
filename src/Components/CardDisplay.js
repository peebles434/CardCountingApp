import React from 'react';
import { back } from '../utils/cardPics';
import '../App.css';

export const CardDisplay = ({ drawFromDeck, count, chosenCard, deck }) => {
  return (
    <div>
      {count <= deck.length - 1 ? (
        <div>
          <img className="cardBack" src={back} alt="" onClick={drawFromDeck} />
        </div>
      ) : null}
      {count < 0 ? null : (
        <div>
          <img className="cardFront" src={chosenCard.image} alt="" />
        </div>
      )}
    </div>
  );
};
