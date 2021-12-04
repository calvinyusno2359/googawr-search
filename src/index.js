import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import reducer, { initialSearchTerm } from "./modules/reducer";
import { SearchTermProvider } from "./modules/SearchTermProvider";

ReactDOM.render(
  <React.StrictMode>
    <SearchTermProvider searchTerm={initialSearchTerm} reducer={reducer}>
      <App />
    </SearchTermProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
