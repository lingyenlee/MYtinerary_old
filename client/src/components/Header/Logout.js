import React, { Component, Fragment } from "react";
import { logOut } from "../../actions/usersActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Logout extends Component {
  constructor(props) {
    super(props);
    //--------need to store user email in the state -----------------
    //-------- otherwise it is gone with the wind------------------
    this.state = {
      email: props.user.email,
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut(e) {
    e.preventDefault();
    this.props.logOut();
    if (!this.props.errorMessage) {
      this.props.history.push("/loginPage");
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          <button to="/loginPage" className="logout-btn" onClick={this.logOut}>
            <i className="medium material-icons">exit_to_app</i>
          </button>
        </div>
        <div className="log-status">
          <span>You are login as </span>
          <span>{this.state.email}</span>
        </div>
      </Fragment>
    );
  }
}

Logout.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  loggedIn: state.userReducer.loggedIn,
});

export default withRouter(
  connect(
    mapStateToProps,
    { logOut }
  )(Logout)
);
