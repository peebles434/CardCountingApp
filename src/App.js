import React from "react";
import "./App.css";
import { CardCountingApp } from "./Components/CardCountingApp";
import { observer } from "mobx-react";

const App = observer(() => {
  return (
    <div>
      <CardCountingApp />
    </div>
  );
});

export default App;
