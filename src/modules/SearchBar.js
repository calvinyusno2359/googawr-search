import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { Button, MenuItem, MenuList } from "@material-ui/core";

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

  // const { suggestions } = useSuggestionApi({ searchTerm: searchInput });
  const { suggestions } = suggestion;
  const inputBoxRef = React.createRef();
  const [showFilteredSuggestions, setShowFilteredSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const filterSuggestion = (e) => {
    const searchInput = e.target.value;
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

  const selectSuggestion = (e) => {
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    switch (e.keyCode) {
      case UP_KEY: {
        console.log("up");
        return;
      }
      case DOWN_KEY: {
        console.log("down");
        return;
      }
    }
  };

  return (
    <div className="SearchBar">
      <form className="SearchBar__form">
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
          onKeyDown={(e) => {
            selectSuggestion(e);
          }}
        />

        {searchInput.length > 1 && (
          <div className="SearchBar__clearButton">
            <ClearIcon
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

      <div className="SearchBar__suggestionMenu">
        {filteredSuggestions.length !== 0 && showFilteredSuggestions === true && (
          <MenuList className="SearchBar__suggestions" autoFocusItem>
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
