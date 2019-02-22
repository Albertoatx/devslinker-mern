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
    errors.handle = 'Handle field is required';
  else if (!Validator.isLength(data.handle, { min: 2, max: 40 }))
    errors.handle = 'Handle must be between 2 and 40 characters';

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
    /* No needed because we use package 'prepend-http', that way we don't bother the user
    if (
      data.website.indexOf('http://') !== 0 && data.website.indexOf('https://') !== 0) {
      errors.website = "Make sure this is a valid 'http(s)://' address";
    }
    else */
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  // validate youtube
  if (!isEmpty(data.youtube)) {
    /* No needed because we use package 'prepend-http', that way we don't bother the user
    if (
      data.youtube.indexOf('http://') !== 0 && data.youtube.indexOf('https://') !== 0) {
      errors.youtube = "Make sure this is a valid 'http(s)://' address";
    }
    else */
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  // validate twitter
  if (!isEmpty(data.twitter)) {
    /*
    if (
      data.twitter.indexOf('http://') !== 0 && data.twitter.indexOf('https://') !== 0) {
      errors.twitter = "Make sure this is a valid 'http(s)://' address";
    }
    else */
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  // validate facebook
  if (!isEmpty(data.facebook)) {
    /*
    if (
      data.facebook.indexOf('http://') !== 0 && data.facebook.indexOf('https://') !== 0) {
      errors.facebook = "Make sure this is a valid 'http(s)://' address";
    }
    else */

    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  // validate linkedin
  if (!isEmpty(data.linkedin)) {
    /*
    if (
      data.linkedin.indexOf('http://') !== 0 && data.linkedin.indexOf('https://') !== 0) {
      errors.linkedin = "Make sure this is a valid 'http(s)://' address";
    }
    else */
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  // validate instagram
  if (!isEmpty(data.instagram)) {
    /*
    if (
      data.instagram.indexOf('http://') !== 0 && data.instagram.indexOf('https://') !== 0) {
      errors.instagram = "Make sure this is a valid 'http(s)://' address";
    }
    else */
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
