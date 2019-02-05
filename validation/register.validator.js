const Validator = require('validator');
const isEmpty = require('./is-empty');

// Define a function to validate Register input fields
module.exports = function validateRegisterInput(data) {

  let errors = {};

  // convert to string '' in case that field does not exist 
  // (because 'validator' library validates and sanitizes strings only) 
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // validate name
  if (Validator.isEmpty(data.name))
    errors.name = 'Name field is required';
  else if (!Validator.isLength(data.name, { min: 2, max: 30 }))
    errors.name = 'Name must be between 2 and 30 characters';

  /* Another options to valide: check isEmpty as the last to not override errors.name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  } */


  // validate email
  if (Validator.isEmpty(data.email))
    errors.email = 'Email field is required';
  else if (!Validator.isEmail(data.email))
    errors.email = 'Email format is invalid';


  // validate password
  if (Validator.isEmpty(data.password))
    errors.password = 'Password field is required';
  else if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = 'Password must be at least 6 characters';
  else if (!new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])').test(data.password)) {
    errors.password = 'Password must contain at least one number, uppercase and lower case letter';
  }


  // validete confirmation password
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }
  else {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords must match';
    }
  }

  return {
    errors, // all the validation errors
    isValid: isEmpty(errors)
  };
};
