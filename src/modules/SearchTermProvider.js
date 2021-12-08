import React, { createContext, useContext, useReducer } from "react";

export const SearchTermContext = createContext();

export const SearchTermProvider = ({ reducer, searchTerm, children }) => (
  <SearchTermContext.Provider value={useReducer(reducer, searchTerm)}>
    {children}
  </SearchTermContext.Provider>
);

export const useSearchTerm = () => useContext(SearchTermContext);

export const initialSearchTerm = {
  term: "",
};

export const actionType = {
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

export const reducer = (state, action) => {
  console.log("Action called", action);

  switch (action.type) {
    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term,
      };

    default:
      return state;
  }
};
