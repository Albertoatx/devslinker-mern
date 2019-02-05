// Global function to be used in all other validation files
const isEmpty = (value) =>
  // in case 1 of those 4 conditions are met, then return true
  (value === undefined
    || value === null
    || (typeof value === 'string' && value.trim().length === 0)
    || (typeof value === 'object' && Object.keys(value).length === 0)
  );

module.exports = isEmpty;