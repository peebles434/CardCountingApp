import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export const UserInputForm = () => {
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
        />
      </form>
    </div>
  );
};
