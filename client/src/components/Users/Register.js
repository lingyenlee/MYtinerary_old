import React, { Component, Fragment } from "react";
import Input from "./UserInput";
import SelectCountry from "./SelectCountry";
import ErrorMessage from "./ErrorMessage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/usersActions";

const emailRegex = new RegExp(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/);

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      isLoading: false,
      countries: [],
      users: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        selectedCountry: "",
      },
      errors: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        selectedCountry: "",
        // isChecked: ""
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitAccountForm = this.submitAccountForm.bind(this);
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(json => this.setState({ countries: json }));
    // let elems = document.querySelectorAll("select");
    // M.FormSelect.init(elems, { inDuration: 300, outDuration: 225 });
  }

  handleInputChange(e) {
    e.preventDefault();

    const value = e.target.value;
    const name = e.target.name;
    const users = this.state.users;
    users[name] = value;
    this.setState({
      users: users,
    });

    const errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username = value.length < 3 ? "min 2 characters required" : "";
        break;
      case "password":
        errors.password = value.length < 6 ? "min 6 characters required" : "";
        break;
      case "email":
        errors.email =
          emailRegex.test(value) && value.length > 0 ? "" : "email not valid";
        break;
      case "lastname":
        errors.lastname = value.length < 3 ? "min 2 characters required" : "";
        break;
      case "firstname":
        errors.firstname = value.length < 3 ? "min 2 characters required" : "";
        break;
      case "isChecked":
        errors.isChecked = true
          ? "Please read Terms and Conditions and check box"
          : "";
        break;
      default:
        break;
      // case "selectedCountry":
      //   errors.selectedCountry =
    }
  }

  submitAccountForm(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (this.validateForm()) {
      const users = {};
      users["username"] = "";
      users["password"] = "";
      users["email"] = "";
      users["firstname"] = "";
      users["lastname"] = "";
      users["selectedCountry"] = "";

      this.setState({ users: users });
    }

    //call the signUprequest function and store the userdata in this.props
    this.props.register(this.state.users);
    // console.log(this.state.users);
    // console.log(this.state);
    // console.log(this.props);
  }

  validateForm() {
    const users = this.state.users;
    const errors = {};
    let formIsValid = true;

    if (!users["username"]) {
      formIsValid = false;
      errors["username"] = "You must enter at least a username or an email";
    }
    if (!users["email"]) {
      formIsValid = false;
      // errors["email"] = "You must enter at least a username or an email";
    }
    if (!users["password"]) {
      formIsValid = false;
      errors["password"] = "Please create a password";
    }

    if (!users["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "Please enter your first name";
    }
    if (!users["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "Please enter your last name";

      if (!this.state.isChecked) {
        formIsValid = false;
        errors["selectedCountry"] = "Please check";
      }
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  render() {
    // console.log(this.props);
    const {
      username,
      password,
      email,
      firstname,
      lastname,
      // selectedCountry
    } = this.state.users;
    const enabled =
      email.length > 0 &&
      username.length > 0 &&
      lastname.length > 0 &&
      firstname.length > 0 &&
      password.length > 0;
    // selectedCountry.length > 0;

    return (
      <Fragment>
        <h4 className="SignUpPageHeader">Register</h4>
        {/* <div className="account-avatar">
        <img src={require("../../images/avatar.png")} alt="avatar" />
        <figcaption>Add Photo</figcaption>
      </div> */}

        <form className="account-container" onSubmit={this.submitAccountForm}>
          <Input
            type={"text"}
            value={this.state.users.username}
            handleChange={this.handleInputChange}
            title={"Username"}
            name={"username"}
          />
          <ErrorMessage errorMsg={this.state.errors.username} />
          <Input
            type={"password"}
            value={this.state.users.password}
            handleChange={this.handleInputChange}
            title={"Password"}
            name={"password"}
          />
          <ErrorMessage errorMsg={this.state.errors.password} />
          <Input
            type={"text"}
            value={this.state.users.email}
            handleChange={this.handleInputChange}
            title={"Email"}
            name={"email"}
          />
          <ErrorMessage errorMsg={this.state.errors.email} />
          <Input
            type={"text"}
            value={this.state.users.lastname}
            handleChange={this.handleInputChange}
            title={"Last Name"}
            name={"lastname"}
          />
          <ErrorMessage errorMsg={this.state.errors.lastname} />
          <Input
            type={"text"}
            value={this.state.users.firstname}
            handleChange={this.handleInputChange}
            title={"First Name"}
            name={"firstname"}
          />
          <ErrorMessage errorMsg={this.state.errors.firstname} />
          <SelectCountry
            title={"Country"}
            placeholder={"Choose"}
            options={this.state.countries}
            value={this.state.selectedCountry}
            handleChange={this.handleInputChange}
            name={"selectedCountry"}
          />
          <div className="accountAgree">
            <label>
              <input type="checkbox" value="check" required />
              <span>I agree to MYtinerary's Terms & Conditions</span>
            </label>
          </div>
          <div className="createAccount">
            <button
              type="submit"
              onSubmit={this.submitAccountForm}
              className="btn btn-primary btn-lg"
            >
              SIGN UP
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.userReducer,
});

export default connect(
  mapStateToProps,
  { register }
)(RegisterForm);
