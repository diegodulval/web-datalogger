import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "./assets/logo.png";

class Home extends Component {
  render() {
    return (
      <div className="jumbotron bg">
        <h1 className="display-3 text-center">
          <img src={logo} className="App-logo" alt="logo" width="200" />
        </h1>
        <p className="text-center">
          <Link
            className="btn btn-produtos btn-lg"
            to="/dashboard/equipamento/1"
            role="button"
          >
            Dashboard &raquo;
          </Link>
        </p>
      </div>
    );
  }
}

export default Home;
