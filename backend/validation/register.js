const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Enter a name.";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Enter an email.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Enter a valid email";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Enter a password.";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm your password.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters.";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
