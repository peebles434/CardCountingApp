// Sets interval duration based on mobX's dealer mode
export const timerDuration = (mode) => {
  if (mode === "easy") {
    return 2000;
  } else if (mode === "medium") {
    return 1500;
  } else if (mode === "hard") {
    return 1000;
  }
};

// Creates a random number between 20 and 40;
export const randomDealerStop = () => {
  let random = Math.floor(Math.random() * 30);
  return random + 10;
};
