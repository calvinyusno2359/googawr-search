import React from "react";

import SearchBar from "../modules/SearchBar";

import "./ResultsPage.css";

function ResultsPage() {
  return (
    <div className="ResultsPage">
      {" "}
      <div className="ResultsPage__header">
        <div className="ResultsPage__SearchBar">
          <SearchBar />
        </div>
      </div>
      <div className="ResultsPage__body">
        <p>Results here</p>
      </div>
    </div>
  );
}

export default ResultsPage;
