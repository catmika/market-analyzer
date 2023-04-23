import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pos-f-t">
      <div
        className={`collapse ${isOpen ? "show" : ""}`}
        id="navbarToggleExternalContent"
      >
        <div className="bg-dark p-4">
          <h4 className="text-white">Choose whatever you want</h4>
          <span className="text-muted">Toggleable via the navbar brand.</span>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark">
        <button
          className={`navbar-toggler ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={toggleNavbar}
        >
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevorn-down"}`}
          ></i>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
