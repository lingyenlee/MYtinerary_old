import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getFavItinerary } from "../../actions/favouriteActions";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import Itinerary from "../ItineraryPage/Itinerary";

class FavouritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favButtonActive: true,
      loggedIn: false,
      view: true,
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.setState({
        loggedIn: true,
      });
      this.props.getFavItinerary(this.props.user.email);
    }
  }

  // -----------------show favourite itineraries with delete button---------------
  showFavourite() {
    return (
      <Fragment>
        {this.props.favourites.length === 0 && (
          <h5>
            You currently do not have any favourite itineraries. Please go to{" "}
            <NavLink to="/cities">city itineraries </NavLink>
            to add your favourites
          </h5>
        )}

        {this.props.favourites.length !== 0 && (
          <div>
            <h5>Here are your favourite itineraries: </h5>
            <Itinerary
              itineraries={this.props.favourites}
              delButton={this.state.view}
            />
          </div>
        )}
      </Fragment>
    );
  }

  goToLogin() {
    return (
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
  }

  render() {
    // conditional rendering of "show favourite itineraries" or "goto LoginPage"
    return (
      <div className="fav-container">
        {this.props.loggedIn ? this.showFavourite() : this.goToLogin()}
      </div>
    );
  }
}

FavouritePage.propTypes = {
  getFavItinerary: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  favourites: state.favouriteReducer.allFav,
  loggedIn: state.userReducer.loggedIn,
});

export default connect(
  mapStateToProps,
  { getFavItinerary }
)(FavouritePage);
