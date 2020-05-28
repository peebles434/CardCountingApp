import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { modeSliderMarks, deckSliderMarks } from "../utils/sliderMarks";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

export const ModeSelector = (props) => {
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
          marks={deckSliderMarks}
          min={1}
          max={6}
          disabled={props.count > 0 ? true : false}
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
          marks={modeSliderMarks}
          min={1}
          max={4}
          disabled={props.count > 0 ? true : false}
        />
      </div>
    </div>
  );
};
