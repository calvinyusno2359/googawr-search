import React from "react";
import SearchBar from "../modules/SearchBar";

import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="LandingPage__header">
        <div className="LandingPage__SearchBar">
          <SearchBar />
        </div>
      </div>
      <div className="LandingPage__body">
        {/* Empty body, just contains styling */}
      </div>
    </div>
  );
}

export default LandingPage;
