import React from "react";

export const CardFront = ({ count, chosenCard }) => {
  return (
    <div>
      {count < 0 ? null : (
        <div>
          <img className="cardFront" src={chosenCard.image} alt="" />
        </div>
      )}
    </div>
  );
};
