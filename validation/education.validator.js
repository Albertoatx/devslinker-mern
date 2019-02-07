const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {

  let errors = {};

  // REQUIRED Fields (Note: these are also checked in mongoose model)
  // ---------------
  // convert to string '' in case that field does not exist 
  // (because 'validator' library validates and sanitizes strings only) 
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  // validate school
  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  // validate degree
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  // validate fieldofstudy
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  // validate 'from' date
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }
  else {
    if (!Validator.isISO8601(data.from)) {
      errors.from = "Please format 'from' date to a valid YYYY-MM-DD";
    }
  }

  // NOT REQUIRED Fields (therefore they can be empty, that is, not informed)
  // -------------------

  // validate 'to' date
  if (!isEmpty(data.to)) {
    if (!Validator.isISO8601(data.to)) {
      errors.to = "Please format 'to' date to a valid YYYY-MM-DD";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};