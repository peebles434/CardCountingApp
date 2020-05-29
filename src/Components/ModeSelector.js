import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { modeSliderMarks, deckSliderMarks } from "../utils/sliderMarks";

function valuetext(value) {
  return `${value}`;
}

export const ModeSelector = ({ count, updateNumberOfDecks }) => {
  const [deckSliderValue, setDeckSliderValue] = useState(1);

  const handleDeckSlider = (event, newValue) => {
    setDeckSliderValue(newValue);
  };
  const handleDeckSliderCommit = (event, newValue) => {
    updateNumberOfDecks(newValue);
  };

  return (
    <div className="sliders">
      <Typography id="discrete-slider" gutterBottom>
        Set Number of Decks
      </Typography>
      <Slider
        value={deckSliderValue}
        defaultValue={1}
        onChange={handleDeckSlider}
        onChangeCommitted={handleDeckSliderCommit}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="off"
        step={1}
        marks={deckSliderMarks}
        min={1}
        max={6}
        disabled={count > 0 ? true : false}
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
        disabled={count > 0 ? true : false}
      />
    </div>
  );
};
