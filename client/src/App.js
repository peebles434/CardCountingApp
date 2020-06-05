import React, { useState, useEffect } from "react";
import "./App.css";
import { CardCountingApp } from "./Components/CardCountingApp";

const App = () => {
  const [state, setState] = useState({ apiResponse: "" });

  function callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setState({ apiResponse: res }));
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div>
      <p>{state.apiResponse}</p>
      <CardCountingApp />
    </div>
  );
};

export default App;
