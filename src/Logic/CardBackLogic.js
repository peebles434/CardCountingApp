export const timerDuration = (mode) => {
  if (mode === "easy") {
    return 2000;
  } else if (mode === "medium") {
    return 1500;
  } else if (mode === "hard") {
    return 1000;
  }
};
