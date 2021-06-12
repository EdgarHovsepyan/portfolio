import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="buttons">
        <NavLink to="/" exact={true}><span></span></NavLink>
        <NavLink to="/particles"><span></span></NavLink>
        <NavLink to="/video"><span></span></NavLink>
        <NavLink to="/second"><span></span></NavLink>
        {/* <NavLink to="//stand-viewer">5</NavLink> */}
      </div>
      <div className="text"></div>
    </div>
  );
};

export default Navbar;
