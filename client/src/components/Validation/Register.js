import validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};
  if (validator.isEmpty(data.profileName)) {
    errors.profileName = "This field is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "This field is required";
  }
  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "This field is required";
  }
  if (validator.isEmpty(data.selectedCountry)) {
    errors.selectedCountry = "Please select a country";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
