import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const deckMarks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
];
const modeMarks = [
  {
    value: 1,
    label: "Click",
  },
  {
    value: 2,
    label: "Auto-Easy",
  },
  {
    value: 3,
    label: "Auto-Medium",
  },
  {
    value: 4,
    label: "Auto-Hard",
  },
];

function valuetext(value) {
  return `${value}`;
}

export const DeckSelector = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="sliders">
        <Typography id="discrete-slider" gutterBottom>
          Set Number of Decks
        </Typography>
        <Slider
          defaultValue={1}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="off"
          step={1}
          marks={deckMarks}
          min={1}
          max={6}
        />
        <Typography id="discrete-slider" gutterBottom>
          Pick Playing Mode
        </Typography>
        <Slider
          defaultValue={1}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="off"
          step={1}
          marks={modeMarks}
          min={1}
          max={4}
        />
      </div>
    </div>
  );
};
