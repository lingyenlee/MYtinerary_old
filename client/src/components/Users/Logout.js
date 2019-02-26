import React, { Component, Fragment } from "react";
import { logOut } from "../../actions/usersActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
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
        <div className="log-status">
          <span>You are login as </span>
          <span>{this.props.googleemail}</span>
        </div>
        <div>
          <button to="/loginPage" className="logout-btn" onClick={this.logOut}>
            <i className="medium material-icons">exit_to_app</i>
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  googleemail: state.userReducer.googleuser.email,
  // useremail: state.userReducer.otheruser.email,
  loggedIn: state.userReducer.loggedIn,
});

export default withRouter(
  connect(
    mapStateToProps,
    { logOut }
  )(Logout)
);
