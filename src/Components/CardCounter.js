import React, { useState, useEffect } from "react";
import "../App.css";
import { AnswerInputForm } from "./AnswerInputForm";

export const CardCounter = (props) => {
  const [runningCount, setRunningCount] = useState(0);

  useEffect(() => {
    const lowCards = /^(2|3|4|5|6)$/;
    const highCards = /^(10|J|Q|K|A)$/;
    if (props.chosenCard.face.match(lowCards)) {
      setRunningCount(runningCount + 1);
    } else if (props.chosenCard.face.match(highCards)) {
      setRunningCount(runningCount - 1);
    }
  }, [props.chosenCard.face, props.chosenCard.suit]);

  return (
    <div>
      <AnswerInputForm runningCount={runningCount} count={props.count} />
      <h2>Running Count: {runningCount}</h2>
      <h2>Number of Cards: {props.count}</h2>
    </div>
  );
};
