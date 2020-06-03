import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// TODO: Add a True Count input and answer checker
export const AnswerInputForm = ({
  answerMode,
  setAnswerMode,
  userAnswer,
  setUserAnswer,
  runningCount,
  count,
}) => {
  const onAnswerChange = (e) => {
    // if (!e.currentTarget.value.match("(^[0-9]+$|^$)")) return false;
    setUserAnswer(e.currentTarget.value);
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
    if (userAnswer == runningCount) {
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

        <Button
          variant="outlined"
          onClick={checkAnswer}
          disabled={count === 0 ? true : false}
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
            <p>You suck, the running count is actually {runningCount}.</p>
            <p>Click the deck to keep playing!</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
