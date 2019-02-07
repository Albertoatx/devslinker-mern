const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {

  let errors = {};

  // REQUIRED Fields (Note: these are also checked in mongoose model)
  // ---------------
  // convert to string '' in case that field does not exist 
  // (because 'validator' library validates and sanitizes strings only) 
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  // validate title
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  // validate company
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  // validate 'from' date
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }
  else {
    if (!Validator.isISO8601(data.from)) {
      errors.from = "Please format 'from' date to YYYY-MM-DD";
    }
  }

  // NOT REQUIRED Fields (therefore they can be empty, that is, not informed)
  // -------------------

  // validate 'to' date
  if (!isEmpty(data.to)) {
    if (!Validator.isISO8601(data.to)) {
      errors.to = "Please format 'to' date to YYYY-MM-DD";
    }
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};