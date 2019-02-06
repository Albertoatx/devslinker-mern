const Validator = require('validator'); // Only works with Strings 
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  // REQUIRED Fields (Note: these are also checked in mongoose model)
  // ---------------
  // Convert to string '' in case that field does not exist (undefined, null)
  // (because 'validator' library validates and sanitizes strings only)  
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  // validate handle
  if (Validator.isEmpty(data.handle))
    errors.name = 'Handle field is required';
  else if (!Validator.isLength(data.handle, { min: 2, max: 40 }))
    errors.name = 'Handle must be between 2 and 40 characters';

  // validate status
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  // validate skills
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  // NOT REQUIRED Fields (therefore they can be empty, that is, not informed)
  // -------------------
  // validate website
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  // validate youtube
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  // validate twitter
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  // validate facebook
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  // validate linkedin
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  // validate instagram
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
