import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getItinerary } from "../../actions/itineraryActions";
import PropTypes from "prop-types";
import Itinerary from "./Itinerary";
import { NavLink } from "react-router-dom";

//This is parent component of Itinerary component

class ItineraryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //set view to true to show addfav or delfav button
      view: true,
    };
  }
  //when component mounts, get itinearies of selected city from mlab
  componentDidMount() {
    const city = this.props.match.params.city;
    this.props.getItinerary(city);
  }

  render() {
    //show no itinerary message if they don't exist
    const NoItinerary = (
      <div className="itinerary-container-wrapper">
        <h5>No itineraries of selected city available!</h5>
        <h5>
          Please choose another <NavLink to="/cities">city.</NavLink>
        </h5>
      </div>
    );

    //show itineraray with add button
    const ShowItinerary = (
      <Fragment>
        <div className="itinerary-container-wrapper">
          <h5>Itineraries available</h5>
          {!this.props.loggedIn && (
            <p>
              Please login <NavLink to="/loginPage">here</NavLink> to add your
              favourite itineraries.
            </p>
          )}
          <Itinerary
            itineraries={this.props.itineraries}
            addButton={this.state.view}
          />
        </div>
      </Fragment>
    );

    //Show itineraries if they exist
    return (
      <div>
        {this.props.itineraries.length === 0 ? NoItinerary : ShowItinerary}
      </div>
    );
  }
}

ItineraryPage.propTypes = {
  getItinerary: PropTypes.func.isRequired,
  itineraries: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  itineraries: state.itineraryReducer.itineraries,
  loggedIn: state.userReducer.loggedIn,
});

export default connect(
  mapStateToProps,
  { getItinerary }
)(ItineraryPage);
