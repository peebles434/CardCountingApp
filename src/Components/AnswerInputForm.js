import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const AnswerInputForm = () => {
  const [userAnswer, setUserAnswer] = useState(0);

  const onAnswerChange = (e) => {
    if (!e.currentTarget.value.match("(^[0-9]+$|^$)")) return false;
    setUserAnswer(Number(e.currentTarget.value));
  };

  return (
    <div>
      <form>
        <TextField
          id="standard-basic"
          label="Running Count?"
          value={userAnswer || ""}
          onChange={onAnswerChange}
          type="number"
        />
        <br />

        <Button variant="outlined">Enter</Button>
      </form>
    </div>
  );
};
