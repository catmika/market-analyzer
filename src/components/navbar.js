import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  //States
  const [isOpen, setIsOpen] = useState(false);
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

  //Functions
  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    const value = event.target.checked;

    // update the state for the checkbox with the matching name
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //Data
  const checkboxOptions = [
    {
      label: "Sentiment",
      name: "sentiment",
      checked: checkboxValues.name,
    },
    {
      label: "News",
      name: "news",
      checked: checkboxValues.name,
    },
    {
      label: "Daily Candle",
      name: "daily_candle",
      checked: checkboxValues.name,
    },
    {
      label: "Position calculator",
      name: "position_calculator",
      checked: checkboxValues.name,
    },
    {
      label: "Session volatility",
      name: "session_volatility",
      checked: checkboxValues.name,
    },
    {
      label: "Seasonality",
      name: "seasonality",
      checked: checkboxValues.name,
    },
    {
      label: "DXY gap",
      name: "dxy_gap",
      checked: checkboxValues.name,
    },
    {
      label: "Study materials",
      name: "study_materials",
      checked: checkboxValues.name,
    },
  ];

  //Render
  return (
    <div className="pos-f-t">
      <div
        className={`collapse${isOpen ? " show" : ""}`}
        id="navbarToggleExternalContent"
      >
        <div className="bg-dark p-4 container-fluid pb-0">
          <div className="row">
            {checkboxOptions.map((option) => (
              <div className="col-sm-4" key={option.name}>
                <label className="form-check-label h5 m-2">
                  {option.label}
                  <input
                    type="checkbox"
                    name={option.name}
                    checked={option.checked}
                    onChange={handleCheckboxChange}
                    className="form-check-input m-2"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark p-0 mb-3">
        <button
          className={`navbar-toggler${isOpen ? "" : " collapsed"} m-1 w-100`}
          type="button"
          onClick={toggleNavbar}
        >
          <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
