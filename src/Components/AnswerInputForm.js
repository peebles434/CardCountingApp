import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useAppState } from "../hooks/state";

// TODO: Add a True Count input and answer checker
export const AnswerInputForm = ({
  answerMode,
  setAnswerMode,
  userAnswer,
  setUserAnswer,
  userTrueCountAnswer,
  setUserTrueCountAnswer,
  count,
}) => {
  const { state } = useAppState();
  const onAnswerChange = (e) => {
    // if (!e.currentTarget.value.match("(^[0-9]+$|^$)")) return false;
    setUserAnswer(e.currentTarget.value);
  };

  const onTrueCountAnswerChange = (e) => {
    setUserTrueCountAnswer(e.currentTarget.value);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    setAnswerMode({
      checkAnswerMode: true,
      correctAnswer: false,
    });
    if (
      userAnswer == state.runningCount &&
      userTrueCountAnswer == state.trueCount
    ) {
      setAnswerMode({
        checkAnswerMode: true,
        correctAnswer: true,
      });
    }
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
          disabled={count === 0 ? true : false}
          type="number"
          onKeyDown={keyPress}
        />

        <br />
        <br />

        <TextField
          id="standard-basic"
          label="True Count?"
          value={userTrueCountAnswer || ""}
          onChange={onTrueCountAnswerChange}
          autoComplete="off"
          disabled={count === 0 ? true : false}
          type="number"
          onKeyDown={keyPress}
        />
        <br />
        <br />

        <Button
          variant="outlined"
          onClick={checkAnswer}
          disabled={count === 0 && state.trueCount === 0 ? true : false}
        >
          Enter
        </Button>
      </form>
      <div>
        {answerMode.checkAnswerMode && answerMode.correctAnswer ? (
          <>
            <p>Good Job!</p>
            <p>Click the deck to keep playing!</p>
          </>
        ) : null}
        {answerMode.checkAnswerMode && !answerMode.correctAnswer ? (
          <>
            <p>
              Incorrect! The running count is {state.runningCount} and the true
              count is {state.trueCount}.
            </p>
            <p>Click the deck to keep playing!</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
