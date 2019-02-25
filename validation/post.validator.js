const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {

  let errors = {};

  // REQUIRED Fields (Note: these are also checked in mongoose model)
  // ---------------
  // convert to string '' in case that field does not exist 
  // (because 'validator' library validates and sanitizes strings only) 
  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }
  else {
    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
      errors.text = "Post must be between 10 and 300 characters";
    }
  }



  // NOT REQUIRED Fields (therefore they can be empty, that is, not informed)
  // -------------------

  return {
    errors,
    isValid: isEmpty(errors)
  };
};