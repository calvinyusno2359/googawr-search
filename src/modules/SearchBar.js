import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { Button, MenuItem, MenuList } from "@material-ui/core";

import "./SearchBar.css";

import { useSearchTerm, actionType } from "./SearchTermProvider";
import { highlightByMatch } from "../utils/highlighter";

import useSuggestionApi from "../hooks/useSuggestionApi";
// import suggestion from "../suggestion"; // uncomment this, if prefer not to send GET request

function SearchBar({ currentSearchInput = "" }) {
  const emptyString = "";

  const [, dispatch] = useSearchTerm();
  const [searchInput, setSearchInput] = useState(currentSearchInput);
  const navigate = useNavigate();

  const search = (e, searchInput) => {
    e.preventDefault();
    if (searchInput === emptyString) return;

    dispatch({
      // store searchInput as a searchTerm in the SearchTermContext to be called at other places
      type: actionType.SET_SEARCH_TERM,
      term: searchInput,
    });

    navigate("/results"); // to ResultsPage at /results
  };

  const { suggestions } = useSuggestionApi({ searchTerm: searchInput }); // comment this, if prefer to use local queryResult
  // const { suggestions } = suggestion;                                 // then uncomment this

  const inputBoxRef = React.createRef();
  const [showFilteredSuggestions, setShowFilteredSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const filterSuggestion = (e) => {
    const searchInput = e.target.value;
    const includesSearchInput = suggestions
      .filter((suggestedTerm) => {
        return suggestedTerm.toLowerCase().includes(searchInput.toLowerCase());
      })
      .slice(0, 6); // top 6 results only

    if (searchInput.length > 2) {
      setFilteredSuggestions(includesSearchInput);
    } else {
      setFilteredSuggestions([]);
    }
  };

  return (
    <div data-testid="SearchBar" className="SearchBar">
      <form className="SearchBar__form">
        <input
          data-testid="SearchBar__input"
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

        {searchInput.length >= 1 && (
          <div
            data-testid="SearchBar__clearButton"
            className="SearchBar__clearButton"
          >
            <ClearIcon
              data-testid="SearchBar__clearIcon"
              className="SearchBar__clearIcon"
              onClick={() => {
                setSearchInput(emptyString);
                setShowFilteredSuggestions(false);
                inputBoxRef.current.focus();
              }}
            />
          </div>
        )}

        <Button type="submit" onClick={search} variant="outlined">
          <SearchIcon className="SearchBar__searchIcon" />
          Search
        </Button>
      </form>

      <div
        data-testid="SearchBar__suggestionMenu"
        className="SearchBar__suggestionMenu"
      >
        {filteredSuggestions.length !== 0 && showFilteredSuggestions === true && (
          <MenuList
            data-testid="SearchBar__suggestions"
            className="SearchBar__suggestions"
            autoFocusItem
          >
            {filteredSuggestions.map((suggestedTerm, idx) => (
              <MenuItem
                key={idx}
                value={suggestedTerm}
                className={`SearchBar__suggestionItem-${idx}`}
                onClick={(e) => {
                  setSearchInput(suggestedTerm);
                  setShowFilteredSuggestions(false);
                  inputBoxRef.current.focus();
                  search(e, suggestedTerm);
                }}
              >
                {highlightByMatch(suggestedTerm, searchInput)}
              </MenuItem>
            ))}
          </MenuList>
        )}
        <div className="SearchBar__suggestionMenuOffset" />
      </div>
    </div>
  );
}

export default SearchBar;
