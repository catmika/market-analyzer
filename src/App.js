import "./App.css";
import Navbar from "./components/navbar";
import Calculator from "./components/calculator";
import { useState } from "react";

const App = () => {
  const [checkboxValues, setCheckboxValues] = useState({
    sentiment: false,
    news: false,
    daily_candle: false,
    position_calculator: false,
    session_volatility: false,
    seasonality: false,
    dxy_gap: false,
    study_materials: false,
  });

  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    const value = event.target.checked;

    // update the state for the checkbox with the matching name
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <>
      <Navbar
        handleCheckboxChange={handleCheckboxChange}
        checkboxValues={checkboxValues}
      />
      {checkboxValues.position_calculator && <Calculator />}
    </>
  );
};

export default App;
