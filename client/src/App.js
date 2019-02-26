import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage-FinalDesign";
import Cities from "./components/Cities";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItineraryPage from "./components/ItineraryPage";
import RegisterForm from "./components/Users/Register";
import LoginPage from "./components/Users/Login";
import HomePage from "./components/Users/Profile";
import FavouritePage from "./components/FavouritePage";

class App extends Component {
  render() {
    let routes = (
      <div>
        <Switch>
          <Route path="/cities" component={Cities} />
          <Route path="/itineraries/:city" component={ItineraryPage} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/loginPage" component={LoginPage} />
          <Route path="/profile" component={HomePage} />
          <Route path="/favourites" component={FavouritePage} />
        </Switch>
      </div>
    );
    let homeRoute = (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Footer />
        </Switch>
      </div>
    );
    return (
      <BrowserRouter>
        <div>
          <Header />
          {homeRoute}
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
