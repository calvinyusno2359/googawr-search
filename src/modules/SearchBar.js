import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

import "./SearchBar.css";

import { useSearchTerm } from "./SearchTermProvider";
import { actionType } from "./reducer";

function SearchBar() {
  const emptyString = "";

  const [_, dispatch] = useSearchTerm();
  const [searchInput, setSearchInput] = useState(emptyString);
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    if (searchInput === emptyString) return;
    console.log(`Search button clicked. Search input is ${searchInput}`);

    dispatch({
      // store searchInput as a searchTerm in the SearchTermContext to be called at other places
      type: actionType.SET_SEARCH_TERM,
      term: searchInput,
    });

    navigate("/results"); // to ResultsPage at /results
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
