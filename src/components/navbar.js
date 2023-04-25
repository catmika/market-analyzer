import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ checkboxValues, handleCheckboxChange }) => {
  //States
  const [isOpen, setIsOpen] = useState(false);

  //Functions
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //Data
  const checkboxOptions = [
    {
      label: "Sentiment",
      name: "sentiment",
    },
    {
      label: "News",
      name: "news",
    },
    {
      label: "Daily Candle",
      name: "daily_candle",
    },
    {
      label: "Position calculator",
      name: "position_calculator",
    },
    {
      label: "Session volatility",
      name: "session_volatility",
    },
    {
      label: "Seasonality",
      name: "seasonality",
    },
    {
      label: "DXY gap",
      name: "dxy_gap",
    },
    {
      label: "Study materials",
      name: "study_materials",
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
                    checked={checkboxValues[option.name]}
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
