import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/results" element={<ResultsPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
