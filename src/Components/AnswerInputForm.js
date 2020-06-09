import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// TODO: Add a True Count input and answer checker
export const AnswerInputForm = ({
  answerMode,
  setAnswerMode,
  userAnswer,
  setUserAnswer,
  userTrueCountAnswer,
  setUserTrueCountAnswer,
  runningCount,
  trueCount,
  count,
}) => {
  const onAnswerChange = (e) => {
    let answer = parseInt(e.currentTarget.value);
    setUserAnswer(answer);
  };

  const onTrueCountAnswerChange = (e) => {
    let answer = parseInt(e.currentTarget.value);
    setUserTrueCountAnswer(answer);
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
    if (userAnswer === runningCount && userTrueCountAnswer === trueCount) {
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
          disabled={count === 0 && trueCount === 0 ? true : false}
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
              Incorrect! The running count is {runningCount} and the true count
              is {trueCount}.
            </p>
            <p>Click the deck to keep playing!</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
