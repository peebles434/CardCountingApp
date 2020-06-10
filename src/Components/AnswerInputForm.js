import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStore } from "../Stores/rootStore";

export const AnswerInputForm = ({ answerMode, setAnswerMode }) => {
  const {
    count,
    runningCount,
    trueCount,
    userAnswer,
    setUserAnswer,
    userTrueCountAnswer,
    setUserTrueCountAnswer,
  } = useStore();

  const onAnswerChange = (e) => {
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
      parseInt(userAnswer) === runningCount &&
      parseInt(userTrueCountAnswer) === trueCount
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
            <p>Incorrect!</p>
            <p>The running count is {runningCount}.</p>
            <p>The true count is {trueCount}.</p>
            <p>Click the deck to keep playing!</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
