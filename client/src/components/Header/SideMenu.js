import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/profileActions";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  // _isMounted = false;
  componentDidMount() {
    let elems = document.querySelector(".sidenav");
    M.Sidenav.init(elems, {
      edge: "left",
      inDuration: 250,
    });
    if (this.props.loggedIn) {
      this.setState({
        loggedIn: true,
      });
      this.props.getUserProfile(this.props.user.email);
    }
  }

  showProfileImage() {
    return (
      <div>
        <div className="profile-image">
          <img
            className="profileImage"
            src={this.props.user.profileImage}
            alt="profileImage"
          />
        </div>
      </div>
    );
  }

  noProfileImage() {
    return (
      <div className="profile-image">
        <i className="material-icons large">account_circle</i>
      </div>
    );
  }

  render() {
    // console.log(this.props.user.profileImage);
    return (
      <div className="menu">
        <ul id="slide-out" className="sidenav">
          <li>
            {this.props.loggedIn
              ? this.showProfileImage()
              : this.noProfileImage()}
          </li>

          <li>
            <NavLink className="sidenav-close" to="/cities">
              <h5>City Itineraries</h5>
            </NavLink>
          </li>
          <li>
            <NavLink className="sidenav-close" to="/profile">
              <h5>Profile</h5>
            </NavLink>
          </li>
          <li>
            <NavLink className="sidenav-close" to="/favourites">
              <h5>Favourite Itineraries</h5>
            </NavLink>
          </li>
        </ul>
        <span data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons medium">menu</i>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  user: state.userReducer.user,
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(SideBar);
