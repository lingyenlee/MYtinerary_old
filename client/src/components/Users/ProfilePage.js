import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserProfile } from "../../actions/profileActions";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.setState({
        loggedIn: true,
      });
      this.props.getUserProfile(this.props.user.email);
    }
  }

  renderShowProfile() {
    return (
      <div>
        <p>This is the profile page</p>
        <img
          className="profileImage"
          src={this.props.user.profileImage}
          alt="profileImage"
        />
        <p>You are login as: {this.props.user.email}</p>
      </div>
    );
  }

  renderGoToLogin() {
    return (
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
  }

  render() {
    // console.log("profile", this.props);
    return (
      <div className="profile-container">
        {this.props.loggedIn
          ? this.renderShowProfile()
          : this.renderGoToLogin()}
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
)(ProfilePage);
