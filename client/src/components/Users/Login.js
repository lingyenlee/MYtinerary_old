import React, { Component } from "react";
import Input from "./UserInput";
import ErrorMessage from "./ErrorMessage";
import { NavLink } from "react-router-dom";
import { login, oauthGoogle } from "../../actions/usersActions";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import validateInput from "../Validation/login";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      errors: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  async responseGoogle(res) {
    //send access Token
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push(`/profile`);
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });

    // const errors = this.state.errors;

    // switch (name) {
    //   case "email":
    //     errors.email = value.length < 3 ? "min 2 characters required" : "";
    //     break;
    //   case "password":
    //     errors.password = value.length < 6 ? "in 6 characters required" : "";
    //     break;
    //   default:
    //     break;
    // }
  };

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({
        errors,
      });
    }
    console.log("is valid? ", isValid);
    return isValid;
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ isLoading: true, errors: {} });
      console.log(this.state);
      this.props.login(this.state);
      if (!this.props.errorMessage) {
        this.props.history.push(`/profile`);
      }
    }
  };

  render() {
    // const enabled =
    //   this.state.email.length > 0 && this.state.password.length > 0;
    const { errors, email, password, isLoading } = this.state;
    return (
      <div>
        <h4 className="loginPageHead">Login</h4>
        <form onSubmit={this.handleSubmit} className="account-container">
          <Input
            type={"email"}
            value={email}
            handleChange={this.handleInputChange}
            title={"Email"}
            name={"email"}
          />
          <ErrorMessage errorMsg={errors.email} />
          <Input
            type={"password"}
            value={password}
            handleChange={this.handleInputChange}
            title={"Password"}
            name={"password"}
          />
          <ErrorMessage errorMsg={errors.password} />
          <div className="check">
            <label>
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>
          <div className="login-register-btn-container">
            <div className="createLogin">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
            <div className="createAccount">
              <NavLink to="/register" className="btn btn-link">
                Register
              </NavLink>
            </div>
          </div>
        </form>

        <p className="login-text">
          Don't have a MYtinerary account yet? You should create one! It's
          totally free and only takes a minute.
        </p>

        {/* ------------ Google LOG IN Button ------------------- */}
        {/* client id should be stored in config later */}
        <div className="google-login-btn">
          <GoogleLogin
            clientId="223768016449-6rug8tn08tjbr8ukeloa8af98k5j0m84.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  oauthGoogle: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  token: state.userReducer.token,
});

export default connect(
  mapStateToProps,
  { login, oauthGoogle }
)(LoginPage);
