import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserProfile } from "../../actions/profileActions";

class HomePage extends Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.getUserProfile(this.props.user._id);
      console.log(this.props.user._id);
    }
  }
  render() {
    console.log(this.props.loggedIn);

    const showProfile = (
      <div>
        <p>This is the profile page</p>
        <p>You are login as: {this.props.user.email}</p>
      </div>
    );

    const goToLogin = (
      <div>
        <h4>Profile</h4>
        <h5>You are not login.</h5>
        <h5>
          Please <NavLink to="/loginPage">login </NavLink>
          to see <br />
          your your.
        </h5>
      </div>
    );
    return (
      <div className="profile-container">
        {this.props.loggedIn ? showProfile : goToLogin}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  loggedIn: state.userReducer.loggedIn,
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(HomePage);
