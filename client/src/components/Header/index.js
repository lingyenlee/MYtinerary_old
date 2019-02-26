import React, { Component } from "react";
import LoginSignUp from "./LoginSignUp";
import Logout from "../Users/Logout";
import SideMenu from "./SideMenu";
import { connect } from "react-redux";

class Header extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="HeaderWrapper">
        <LoginSignUp />
        {this.props.loggedIn === true && <Logout />}
        <SideMenu />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn
});

export default connect(mapStateToProps)(Header);
