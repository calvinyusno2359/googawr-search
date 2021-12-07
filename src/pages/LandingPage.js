import React from "react";

import "./LandingPage.css";

import SearchBar from "../modules/SearchBar";
import Banner from "../modules/Banner";

function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="LandingPage__banner">
        <Banner text="An Official Website." />
      </div>
      <div className="LandingPage__header">
        <SearchBar className="LandingPage__SearchBar" />
      </div>

      <div className="LandingPage__body">
        {/* Empty body, just contains styling */}
      </div>
    </div>
  );
}

export default LandingPage;
