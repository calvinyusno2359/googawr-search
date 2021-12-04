import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input />
      <Button variant="outlined">
        <SearchIcon className="SearchBar__searchIcon" />
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
