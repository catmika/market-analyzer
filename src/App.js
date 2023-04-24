import "./App.css";
import Navbar from "./components/navbar";
import Calculator from "./components/calculator";
import { useState } from "react";

const App = () => {
  return (
    <>
      <Navbar />
      <Calculator />
    </>
  );
};

export default App;
