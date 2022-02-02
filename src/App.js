import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./routes/Search.js";
import Navigation from "./components/Navigation.js";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" exact={true} element={<Search />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
