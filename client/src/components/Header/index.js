import React, { Component } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { connect } from "react-redux";

import SideMenu from "./SideMenu";

class Header extends Component {
  render() {
    return (
      <div className="HeaderWrapper">
        {this.props.loggedIn ? <Logout /> : <Login />}
        <SideMenu />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
});

export default connect(mapStateToProps)(Header);
