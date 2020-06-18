import React from "react";

export const CardFront = ({ count, chosenCard }) => {
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
};
