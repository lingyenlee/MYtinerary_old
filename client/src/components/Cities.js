import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCities } from "../actions/citiesActions";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";
import { NavLink } from "react-router-dom";

//This component display links to all itineraries or individual city itineraries
class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  //the update search updates the value that was entered into the search bar
  updateSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  //when component mounts, get cities from mlab
  componentDidMount() {
    this.props.getCities();
  }

  render() {
    //filter cities according to search value
    const filteredCities = this.props.cities.filter(result => {
      return result.city.toLowerCase().includes(this.state.search);
    });
    return (
      <Fragment>
        <div className="cities-heading">
          <h4>City Itineraries</h4>
          <h5>Please click on a city to see the itineraries avaliable</h5>
        </div>

        {/* ---------START search bar--------------- */}
        <nav className="search-bar">
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <DebounceInput
                  debounceTimeout={200}
                  type="search"
                  placeholder="Search city"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)}
                />
                <label className="label-icon">
                  <i className="material-icons search">search</i>
                </label>
              </div>
            </form>
          </div>
        </nav>
        {/* ---------END search bar--------------- */}

        <div className="cityList">
          {filteredCities.map(result => {
            return (
              <div key={result.city} className="city">
                <NavLink to={`/itineraries/${result.city}`}>
                  <h5>
                    {result.city}, {result.country}
                  </h5>
                </NavLink>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

Cities.propTypes = {
  getCities: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cities: state.cityReducer.cities,
});

export default connect(
  mapStateToProps,
  { getCities }
)(Cities);
