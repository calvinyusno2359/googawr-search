import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

import {
  SearchTermProvider,
  initialSearchTerm,
  reducer,
} from "./modules/SearchTermProvider";

ReactDOM.render(
  <React.StrictMode>
    <SearchTermProvider searchTerm={initialSearchTerm} reducer={reducer}>
      <App />
    </SearchTermProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
