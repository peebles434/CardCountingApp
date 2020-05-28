import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export const AnswerInputForm = (props) => {
  const [userAnswer, setUserAnswer] = useState(0);
  const [answerMode, setAnswerMode] = useState({
    checkAnswerMode: false,
    correctAnswer: false,
  });

  const onAnswerChange = (e) => {
    if (!e.currentTarget.value.match("(^[0-9]+$|^$)")) return false;
    setUserAnswer(Number(e.currentTarget.value));
  };

  const checkAnswer = () => {
    setAnswerMode({
      checkAnswerMode: true,
      correctAnswer: false,
    });
    if (userAnswer == props.runningCount) {
      setAnswerMode({
        checkAnswerMode: true,
        correctAnswer: true,
      });
    }
  };

  const resumePlay = () => {
    setAnswerMode({
      checkAnswerMode: false,
      correctAnswer: false,
    });
  };

  return (
    <div>
      <form>
        <TextField
          id="standard-basic"
          label="Running Count?"
          value={userAnswer || ""}
          onChange={onAnswerChange}
          autoComplete="off"
        />
        <br />

        <Button variant="outlined" onClick={checkAnswer}>
          Enter
        </Button>
      </form>
      <div>
        {answerMode.checkAnswerMode && answerMode.correctAnswer ? (
          <p>Good Job! Click the deck to continue playing!</p>
        ) : null}
        {answerMode.checkAnswerMode && !answerMode.correctAnswer ? (
          <p>You suck</p>
        ) : null}
        {answerMode.checkAnswerMode ? (
          <Button variant="outlined" onClick={resumePlay}>
            Resume
          </Button>
        ) : null}
      </div>
    </div>
  );
};
