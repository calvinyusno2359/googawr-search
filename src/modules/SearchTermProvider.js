import React, { createContext, useContext, useReducer } from "react";

export const SearchTermContext = createContext();

export const SearchTermProvider = ({ reducer, searchTerm, children }) => (
  <SearchTermContext.Provider value={useReducer(reducer, searchTerm)}>
    {children}
  </SearchTermContext.Provider>
);

export const useSearchTerm = () => useContext(SearchTermContext);
