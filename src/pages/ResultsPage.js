import React from "react";

import "./ResultsPage.css";

import SearchBar from "../modules/SearchBar";
import { useSearchTerm } from "../modules/SearchTermProvider";
import useSearchApi from "../modules/useSearchApi";

import queryResult from "../queryResult";

function ResultsPage() {
  const [{ term }] = useSearchTerm();
  // const { queryResult } = useSearchApi({ searchTerm: term });

  console.log("Query Result", queryResult);

  return (
    <div className="ResultsPage">
      <div className="ResultsPage__header">
        <div className="ResultsPage__SearchBar">
          <SearchBar currentSearchInput={term} />
        </div>
      </div>
      <div className="ResultsPage__body">
        <p>{term}</p>
      </div>
    </div>
  );
}

export default ResultsPage;
