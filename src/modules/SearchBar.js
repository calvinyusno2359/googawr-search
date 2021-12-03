import React from "react";

import SearchIcon from "@material-ui/icons/Search";

import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input />
      <button id="search">
        <SearchIcon className="SearchBar__searchIcon" />
        Search
      </button>
    </div>
  );
}

export default SearchBar;
