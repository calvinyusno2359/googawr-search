import React from "react";

import "./ResultsPage.css";

import SearchBar from "../modules/SearchBar";
import { useSearchTerm } from "../modules/SearchTermProvider";
import useSearchApi from "../hooks/useSearchApi";

import queryResult from "../queryResult";
import { highlightByOffset } from "../utils/highlighter";

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
        {queryResult && ( // if queryResult doesn't exist, don't render this
          <div className="ResultsPage__results">
            <p className="ResultsPage__count">
              Showing {queryResult?.Page} - {queryResult?.PageSize} of{" "}
              {queryResult?.TotalNumberOfResults} results
            </p>

            {queryResult?.ResultItems.map((resultItem) => (
              <div key={resultItem.DocumentId} className="ResultsPage__result">
                <a href={resultItem.DocumentURI}>
                  <h2 className="ResultsPage__documentTitle">
                    {resultItem.DocumentTitle.Text}
                  </h2>
                </a>

                <p className="ResultsPage__documentExcerpt">
                  {highlightByOffset(
                    resultItem.DocumentExcerpt.Text,
                    resultItem.DocumentExcerpt.Highlights
                  )}
                </p>

                <p className="ResultsPage__documentURI">
                  {resultItem.DocumentURI}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
