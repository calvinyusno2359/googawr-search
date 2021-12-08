import React from "react";

import "./Banner.css";
import logo from "../logo.png";

function Banner({ icon = logo, text }) {
  return (
    <div data-testid="Banner" className="Banner">
      <div data-testid="Banner__content" className="Banner__content">
        <img
          data-testid="Banner__icon"
          className="Banner__icon"
          alt="logo.png"
          src={icon}
        />
        <div data-testid="Banner__text" className="Banner__text">
          {text}
        </div>
      </div>
    </div>
  );
}

export default Banner;
