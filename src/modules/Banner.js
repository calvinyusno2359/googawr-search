import React from "react";

import "./Banner.css";
import logo from "../logo.png";

function Banner({ icon = logo, text }) {
  return (
    <div className="Banner">
      <div className="Banner__content">
        <img className="Banner__icon" alt="logo.png" src={icon} />
        <div className="Banner__text">{text}</div>
      </div>
    </div>
  );
}

export default Banner;
