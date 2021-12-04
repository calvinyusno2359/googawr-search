import React, { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

import "./SearchBar.css";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const search = (e) => {
    e.preventDefault();
    console.log("Search button clicked.");
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
