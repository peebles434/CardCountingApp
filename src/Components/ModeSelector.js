import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { modeSliderMarks, deckSliderMarks } from "../utils/sliderMarks";

function valuetext(value) {
  return `${value}`;
}

export const ModeSelector = ({
  count,
  updateNumberOfDecks,
  updateGameMode,
}) => {
  const [deckSliderValue, setDeckSliderValue] = useState(1);
  const [modeSliderValue, setModeSliderValue] = useState(1);

  const handleDeckSlider = (event, newValue) => {
    setDeckSliderValue(newValue);
  };
  const handleDeckSliderCommit = (event, newValue) => {
    updateNumberOfDecks(newValue);
  };

  const handleModeSlider = (event, newValue) => {
    setModeSliderValue(newValue);
  };

  const handleModeSliderCommit = (event, newValue) => {
    updateGameMode(newValue);
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
        Pick Playing Mode (not yet functional)
      </Typography>
      {/* TODO: Add functionality to Playing Mode Slider */}
      <Slider
        value={modeSliderValue}
        defaultValue={1}
        onChange={handleModeSlider}
        onChangeCommitted={handleModeSliderCommit}
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
