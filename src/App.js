import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//import components
import Home from "./Pages/Home";

import SignUpForm from "./Components/SignUpForm";
import WatchList from "./Pages/WatchList";

//import Route
import { Route, Switch } from "react-router-dom";

// import

import Navigation from "./Components/Navigation";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signup">
          <SignUpForm />
        </Route>
        <Route exact path="/watchlist">
          <WatchList />
        </Route>
        <Route exact path="/search">
          <SearchPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
