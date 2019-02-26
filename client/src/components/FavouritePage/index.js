import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getFavItinerary } from "../../actions/favouriteActions";
import { NavLink } from "react-router-dom";
// import DelFavButton from "./DelFavButton";
import Itinerary from "../ItineraryPage/Itinerary";

class FavouritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      isLogged: false,
    };
  }

  componentDidMount() {
    let fav = { fav: this.props.googleuser.favItinerary };
    this.props.getFavItinerary(fav);
    this.setState(
      {
        isLogged: true,
      }
      // () => this.props.getFavItinerary(fav)
    );
  }

  render() {
    // show favourite itineraries with delete button
    const showFavourite = (
      <Fragment>
        <h5>Here are your favourite itineraries: </h5>
        <Itinerary
          itineraries={this.props.favourites}
          delButton={this.state.view}
        />
      </Fragment>
    );

    /* -------child component for button that del fav itineraries   ----*/

    //goto login if not login to see favourite itineraries
    const goToLogin = (
      <div>
        <h4>Favourite Itineraries</h4>
        <h5>You are not login.</h5>
        <h5>
          Please <NavLink to="/loginPage">login </NavLink>
          to see <br />
          your favourite itineraries.
        </h5>
      </div>
    );

    // conditional rendering of "show favourite itineraries" or "goto LoginPage"
    return (
      <div className="fav-container">
        {this.props.loggedIn ? showFavourite : goToLogin}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  googleuser: state.userReducer.googleuser,
  favourites: state.userReducer.selectedItineraries,
  loggedIn: state.userReducer.loggedIn,
});

export default connect(
  mapStateToProps,
  { getFavItinerary }
)(FavouritePage);
