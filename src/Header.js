import React from "react";
import { Link } from "react-router-dom";

import logoVertical from "./assets/logo2.png";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src={logoVertical}
            alt="logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <li>
              <Link className="nav-item nav-link active" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-item nav-link active" to="/dashboard/equipamento/1">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="nav-item nav-link active" to="/sobre">
                Sobre
              </Link>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
