import React, { useState, useEffect } from "react";
import "../App.css";

export const CardCounter = (props) => {
  let [runningCount, setRunningCount] = useState(0);

  useEffect(() => {
    const lowCards = /^(2|3|4|5|6)$/;
    const highCards = /^(10|J|Q|K|A)$/;
    if (props.chosenCard.face.match(lowCards)) {
      setRunningCount(runningCount + 1);
    } else if (props.chosenCard.face.match(highCards)) {
      setRunningCount(runningCount - 1);
    }
  }, [props.chosenCard.face]);

  return (
    <div>
      <h2>Running Count: {runningCount}</h2>
      <h2>Number of Cards: {props.count}</h2>
    </div>
  );
};
