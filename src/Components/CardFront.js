import React from "react";
import { useStore } from "../Stores/rootStore";

export const CardFront = () => {
  const { count, image } = useStore();
  return (
    <div>
      {count < 0 ? null : (
        <div>
          <img
            className="cardFront noselect"
            src={image}
            alt=""
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};
