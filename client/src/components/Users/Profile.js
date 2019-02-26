import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class HomePage extends Component {
  render() {
    console.log(this.props.loggedIn);

    const showProfile = (
      <div>
        <p>This is the profile page</p>
        <p>You are login as: {this.props.email}</p>
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
  email: state.userReducer.googleuser.email,
  loggedIn: state.userReducer.loggedIn,
});

export default connect(mapStateToProps)(HomePage);
