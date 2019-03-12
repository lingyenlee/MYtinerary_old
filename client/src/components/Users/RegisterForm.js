import React, { Component, Fragment } from "react";
import Input from "./UserInput";
import SelectCountry from "./SelectCountry";
import ErrorMessage from "./ErrorMessage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/usersActions";
import validateRegisterInput from "./ValidateRegister";

const emailRegex = new RegExp(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/);

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userExist: false,
      countries: [],
      selectedFile: null,
      user: {
        profileName: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        selectedCountry: "",
      },
      errors: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ------------API call to fetch list of countries ------------------------
  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(json => this.setState({ countries: json }));
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    const user = this.state.user;
    user[name] = value;
    this.setState({
      user: user,
    });
  };

  // ---------pass data to validation and check if all fields are filled in ---------
  isValid() {
    const { errors, isValid } = validateRegisterInput(this.state.user);
    //----------if fields are missing, update error messages --------------------
    if (!isValid) {
      this.setState({
        errors,
      });
    }
    console.log("register is valid? ", isValid);
    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      // --------- update if all fields are filled in --------------------
      this.setState({ isLoading: true, errors: {} });
    }
    if (this.isValid()) {
      const {
        profileName,
        password,
        email,
        firstname,
        lastname,
        selectedCountry,
      } = this.state.user;
      let formData = new FormData();
      formData.append("file", this.state.selectedFile);
      formData.append("profileName", profileName);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("lastname", lastname);
      formData.append("firstname", firstname);
      formData.append("selectedCountry", selectedCountry);
      console.log(formData);
      this.props.register(formData);

      if (!this.props.errorMessage) {
        this.props.history.push(`/loginPage`);
        alert("Profile successfully created!");
      }
      // else {
      //   // console.log(this.props.errorMessage);
      //   this.setState({
      //     userExist: true,
      //   });
      // }
    }
  }

  fileSelectedHandler = e => {
    this.setState({ selectedFile: e.target.files[0] });
    console.log(e.target.files[0]);
  };

  fileUploadHandler = e => {};

  render() {
    const {
      profileName,
      password,
      email,
      firstname,
      lastname,
      selectedCountry,
    } = this.state.user;

    return (
      <Fragment>
        <h4 className="SignUpPageHeader">Register</h4>

        <form className="account-container" onSubmit={this.handleSubmit}>
          <div className="profileImage">
            <p>Upload your photo</p>
            <i className="material-icons small">add_a_photo</i>
            <input
              type="file"
              name="file"
              onChange={this.fileSelectedHandler}
            />
          </div>
          <Input
            type={"text"}
            value={profileName}
            handleChange={this.handleInputChange}
            title={"Username"}
            name={"profileName"}
          />
          <ErrorMessage errorMsg={this.state.errors.profileName} />
          <Input
            type={"password"}
            value={password}
            handleChange={this.handleInputChange}
            title={"Password"}
            name={"password"}
          />
          <ErrorMessage errorMsg={this.state.errors.password} />
          <Input
            type={"text"}
            value={email}
            handleChange={this.handleInputChange}
            title={"Email"}
            name={"email"}
          />
          <ErrorMessage errorMsg={this.state.errors.email} />
          <Input
            type={"text"}
            value={lastname}
            handleChange={this.handleInputChange}
            title={"Last Name"}
            name={"lastname"}
          />
          <ErrorMessage errorMsg={this.state.errors.lastname} />
          <Input
            type={"text"}
            value={firstname}
            handleChange={this.handleInputChange}
            title={"First Name"}
            name={"firstname"}
          />
          <ErrorMessage errorMsg={this.state.errors.firstname} />
          <SelectCountry
            title={"Country"}
            placeholder={"Choose"}
            options={this.state.countries}
            value={selectedCountry}
            handleChange={this.handleInputChange}
            name={"selectedCountry"}
          />
          <ErrorMessage errorMsg={this.state.errors.selectedCountry} />
          <div className="accountAgree">
            <label>
              <input type="checkbox" required />
              <span>I agree to MYtinerary's Terms & Conditions</span>
            </label>
          </div>
          <div className="createAccount">
            <button type="submit" className="btn btn-primary btn-lg">
              REGISTER
            </button>
          </div>
        </form>
        {/* {this.state.userExist ?  : null} */}
      </Fragment>
    );
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errorMessage: state.userReducer.errorMessage,
});

export default connect(
  mapStateToProps,
  { register }
)(RegisterForm);
