import React, { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

import "./SearchBar.css";

function SearchBar() {
  const emptyString = "";
  const [searchInput, setSearchInput] = useState(emptyString);

  const search = (e) => {
    e.preventDefault();
    if (searchInput === emptyString) return;
    console.log(`Search button clicked. Search input is ${searchInput}`);
  };

  return (
    <form className="SearchBar">
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button type="submit" onClick={search} variant="outlined">
        <SearchIcon className="SearchBar__searchIcon" />
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
