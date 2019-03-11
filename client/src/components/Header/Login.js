import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
// import { AccountCircle } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

class Login extends Component {
  componentDidMount() {
    let elems = document.querySelector(".modal");
    M.Modal.init(elems);
  }
  render() {
    return (
      <div className="user">
        {/* <!-- Modal Trigger --> */}
        <i data-target="modal1" className="material-icons modal-trigger medium">
          account_circle
        </i>

        {/* <!-- Modal Structure --> */}
        <div id="modal1" className="modal">
          <ul className="modal-content">
            <NavLink to="/register" className="modal-close">
              <h5>Register</h5>
            </NavLink>
            <NavLink to="/loginPage" className="modal-close">
              <h5>Login</h5>
            </NavLink>
          </ul>
          <div className="modal-footer">
            <button className="modal-close">Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
