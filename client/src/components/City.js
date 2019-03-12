// import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
// import { getCities } from "../actions/citiesActions";
// import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";

// class City extends Component {
//   constructor() {
//     super();
//     this.state = {
//       filteredCities: [],
//     };
//   }

//   componentWillMount() {
//     this.props.getCities();
//     this.setState({
//       filteredCities: this.props.cities,
//     });
//   }

//   filterCities = cityFilter => {
//    const {filteredCities} = this.state
//     filteredCities = filteredCities.filter(result => {
//         return result.city.toLowerCase().includes(cityFilter);
//     });
//     this.setState({
//       filteredPoets,
//     });
//   };

//   render() {
//     return (
//       <Poets
//         poets={this.state.filteredPoets}
//         match={this.props.match}
//         onChange={this.filterPoets}
//       />
//     );
//   }
// }

// Cities.propTypes = {
//   getCities: PropTypes.func.isRequired,
// };

// const mapStateToProps = state => ({
//   cities: state.cityReducer.cities,
// });

// export default connect(
//   mapStateToProps,
//   { getCities }
// )(City);
