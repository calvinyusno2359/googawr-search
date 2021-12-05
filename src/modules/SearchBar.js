import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";

import "./SearchBar.css";

import { useSearchTerm } from "./SearchTermProvider";
import { actionType } from "./reducer";
import useSuggestionApi from "../hooks/useSuggestionApi";
import suggestion from "../suggestion";
import { highlightByMatch } from "../utils/highlighter";

function SearchBar({ currentSearchInput = "" }) {
  const emptyString = "";

  const [, dispatch] = useSearchTerm();
  const [searchInput, setSearchInput] = useState(currentSearchInput);
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

  // const { suggestions } = useSuggestionApi({ searchTerm: searchInput });
  const { suggestions } = suggestion;
  const inputBoxRef = React.createRef();
  const [showFilteredSuggestions, setShowFilteredSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const filterSuggestion = (e) => {
    const searchInput = e.target.value;
    console.log(e.target.value.length);
    const includesSearchInput = suggestions
      .filter((suggestedTerm) => {
        return suggestedTerm.toLowerCase().includes(searchInput.toLowerCase());
      })
      .slice(0, 6);

    if (searchInput.length > 2) {
      setFilteredSuggestions(includesSearchInput);
    } else {
      setFilteredSuggestions([]);
    }
  };

  return (
    <form className="SearchBar">
      <input
        type="text"
        autoFocus
        ref={inputBoxRef}
        value={searchInput}
        onChange={(e) => {
          filterSuggestion(e);
          setSearchInput(e.target.value);
          setShowFilteredSuggestions(true);
        }}
      />

      {searchInput.length > 1 && (
        <ClearIcon
          className="SearchBar__clearIcon"
          onClick={() => {
            setSearchInput(emptyString);
            setShowFilteredSuggestions(false);
            inputBoxRef.current.focus();
          }}
        />
      )}

      <Button type="submit" onClick={search} variant="outlined">
        <SearchIcon className="SearchBar__searchIcon" />
        Search
      </Button>

      {filteredSuggestions.length !== 0 && showFilteredSuggestions === true && (
        <div className="SearchBar__suggestions">
          {filteredSuggestions.map((suggestedTerm) => (
            <p
              key={suggestedTerm}
              className="SearchBar__suggestionItem"
              onClick={(e) => {
                setSearchInput(suggestedTerm);
                setShowFilteredSuggestions(false);
                inputBoxRef.current.focus();
                search(e);
              }}
            >
              {highlightByMatch(suggestedTerm, searchInput)}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}

export default SearchBar;
