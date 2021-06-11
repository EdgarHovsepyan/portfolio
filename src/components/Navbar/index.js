import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="buttons">
        <Link to="/">1</Link>
        <Link to="/particles">2</Link>
        <Link to="/video">3</Link>
        <Link to="/second">4</Link>
      </div>
      <div className="text"></div>
    </div>
  );
};

export default Navbar;
