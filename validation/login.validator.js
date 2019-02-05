const Validator = require('validator');  // validator module
const isEmpty = require('./is-empty');

// Define a function to validate Login input fields
module.exports = function validateLoginInput(data) {

  let errors = {};

  // convert to string '' in case that field does not exist 
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // validate email
  if (Validator.isEmpty(data.email))
    errors.email = 'Email field is required';
  else if (!Validator.isEmail(data.email))
    errors.email = 'Email format is invalid';


  // validate password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors, //all the errors
    isValid: isEmpty(errors)
  };
};