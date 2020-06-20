import React from "react";
import { useStore } from "../Stores/rootStore";

export const CardFront = ({ chosenCard }) => {
  const { count } = useStore();
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
