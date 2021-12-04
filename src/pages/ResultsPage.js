import React from "react";

import "./ResultsPage.css";

import SearchBar from "../modules/SearchBar";
import { useSearchTerm } from "../modules/SearchTermProvider";

function ResultsPage() {
  const [{ term }, dispath] = useSearchTerm();

  return (
    <div className="ResultsPage">
      <div className="ResultsPage__header">
        <div className="ResultsPage__SearchBar">
          <SearchBar />
        </div>
      </div>
      <div className="ResultsPage__body">
        <p>{term}</p>
      </div>
    </div>
  );
}

export default ResultsPage;
