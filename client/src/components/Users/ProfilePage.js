import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

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
        <div className="profile-image">
          <img
            className="profileImage"
            src={this.props.user.profileImage}
            alt="profileImage"
          />
        </div>
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
          your profile.
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

ProfilePage.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  user: state.userReducer.user,
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(ProfilePage);
