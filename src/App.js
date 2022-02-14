import React from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import Infobar from "./components/Infobar";
import Newsbar from "./components/Newsbar";

function App() {
  return (
    <div className="App">
      <Appbar />
      <Infobar />
    </div>
  );
}

export default App;
