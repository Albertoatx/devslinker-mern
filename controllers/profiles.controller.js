// Load mongoose models
const Profile = require('../models/Profile');
const User = require('../models/User');

// Load Input Validation functions
const validateProfileInput = require('../validation/profile.validator');
const validateEducationInput = require('../validation/education.validator');
const validateExperienceInput = require('../validation/experience.validator');

const prependHttp = require("prepend-http");
const axios = require("axios");
const keys = require('../config/keys');

// ----------------------------------------------------------------------------
// Helper functions                                                          //
// ----------------------------------------------------------------------------

// helper function to remove duplicate values from an array
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const uniqueList = (list) => {
  return Array.from(new Set(list));
}

// helper function to meet DRY by assigning each property (group 'if' statements)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const createObject = (sourceObj, propsArray) => {
  const newObj = {};

  propsArray.forEach(prop => {
    // if property exists in the source object -> copy into new object
    // if (sourceObj[prop]) newObj[prop] = sourceObj[prop];
    if (sourceObj[prop]) newObj[prop] = prependHttp(sourceObj[prop], { https: true });
  });

  return newObj;
}

// helper function to meet DRY (because 3 different routes do the same query)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const getSingleUserProfile = (res, query) => {

  const errors = {};

  Profile.findOne(query)
    .populate('user', ['name', 'avatar']) // checks the 'user' collection
    .then(profile => {

      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
}

// ----------------------------------------------------------------------------
// getUserProfile - A controller method that retrieves the user profile info
// ----------------------------------------------------------------------------
exports.getUserProfile = (req, res) => {

  let query = { user: req.user.id };

  getSingleUserProfile(res, query);

  /* refactor, take out this DB logic (other routes will do same logic)
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar']) // checks the 'user' collection
    .then(profile => {

      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
    */

}

// ----------------------------------------------------------------------------
// getUserProfileByHandle - A controller method that retrieves the user profile 
//                          info using the 'handle' request param
//                          Code is almost the same that 'getUserProfile'
// ----------------------------------------------------------------------------
exports.getUserProfileByHandle = (req, res) => {

  let query = { handle: req.params.handle };

  getSingleUserProfile(res, query);
}

// ----------------------------------------------------------------------------
// getUserProfileByUser_id - A controller method that retrieves the user profile 
//                           info using the 'user_id' request param.
//                           Code is almost the same that 'getUserProfile' 
// ----------------------------------------------------------------------------
exports.getUserProfileByUser_id = (req, res) => {

  let query = { user: req.params.user_id };

  getSingleUserProfile(res, query);
}

// ----------------------------------------------------------------------------
// getAllProfiles - A controller method that retrieves a list of user profiles 
// ----------------------------------------------------------------------------
exports.getAllProfiles = (req, res) => {

  const errors = {};

  // Profile.find({ handle: "chuck999" })  // only for testing (no results)
  Profile.find()  // retrieves an empty array if no matches
    .populate('user', ['name', 'avatar'])
    .then(profiles => {

      // if (!profiles) {
      if (!profiles || profiles.length === 0) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(400).json(err));
  //.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
}


// ----------------------------------------------------------------------------
// upsertUserProfile - A controller method that creates or edits the 
//                     user profile info using 'upsert'
// ----------------------------------------------------------------------------
exports.upsertUserProfile = (req, res) => {
  // console.log(req.user);
  const { errors, isValid } = validateProfileInput(req.body); //destructuring

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Destructuring to stay DRY does NOT work for 2nd level fields when those
  // fields are OPTIONAL because in that case they would be created as 'undefined'
  // when they are not informed and later saved in the DB as null values. 
  // const { skills, youtube, twitter, facebook, linkedin, instagram } = req.body;
  // console.log(`twitter value: ${twitter}`); // not required, could be undefined 

  const { skills } = req.body; // Destructuring 
  const socialProps = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];
  const profileFields = {
    // to stay DRY (avoid bunch of if statements) use spread operator for 1st level props
    ...req.body,
    user: req.user.id,
    skills: uniqueList(skills.split(',').map((skill) => skill.trim())),
    website: req.body.website ? prependHttp(req.body.website) : '',
    // social: { youtube, twitter, facebook, linkedin, instagram }// PROBLEM: create nulls
    social: createObject(req.body, socialProps)                   // Solution!
  };

  // Comment to stay DRY (this code would be done by the spread operator ...req.body)
  // Get fields
  /*
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  // Skills - Split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // Comment to stay DRY (this code would be done by function 'createObject')
  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  */


  // DB logic (NEW version - upsert to improve efficiency)
  // First - checking if the handle already exists for another user
  Profile.findOne({ handle: profileFields.handle })
    .then((profile) => {
      // if the handle exists and it is from another user -> error
      if (profile && profile.user != req.user.id) {
        errors.handle = 'That handle already exists';
        return res.status(400).json(errors);
      }

      // upsert profile
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        {
          upsert: true,
          new: true
        }
      )
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err));
    })


  // DB logic (old version - inefficient)
  /*
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists';
              return res.status(400).json(errors);
            }

            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
      }
    })
    .catch(err => res.status(400).json(err));
    */
}

// ----------------------------------------------------------------------------
// addExperienceToProfile - A controller method that adds a job experience to 
//                          the user profile collection inside an array
// ----------------------------------------------------------------------------
exports.addExperienceToProfile = (req, res) => {

  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // ES6 way (destructuring because same names)
  const { title, company, location, from, to, current, description } = req.body;
  const newExperience = {
    title,   // same as title: req.body.title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  // With only 1 DB access: findOneAndUpdate
  // Note: if we don't allow duplicates this solution does not fit (complex to adapt)
  Profile.findOneAndUpdate(
    {
      user: req.user.id
    },
    {
      $push: { experience: { $each: [newExperience], $position: 0 } }// push at the beginning
    },
    {
      new: true,   // return the updated version
    }
  ).then((profile) => {
    res.json(profile);
  }).catch((err) => {
    res.status(400).json(err)
    //res.status(500).json({ 'error': 'error adding new experience to profile' });
  })

  // 2 DB operations: findOne + save (if we don't allow duplicates this is easier to adapt)
  /* 
  Profile.findOne({ user: req.user.id })
    .then(profile => {

      // ES6 way (destructuring because same names)
      const { title, company, location, from, to, current, description } = req.body;
      const newExperience = {
        title,  // same as title: title,
        company,
        location,
        from,
        to,
        current,
        description
      };

      // check if experience is duplicated with another 'findOne' using $elemMatch
      //experience: { $elemMatch: { $exists: true } }, //
      //experience: { $elemMatch: { title: req.body.title } },

      // Add new experience to the experience array
      profile.experience.unshift(newExperience);

      profile.save().then(profile => res.json(profile));
    });
  */

}


// ----------------------------------------------------------------------------
// addEducationToProfile - A controller method that adds education experience to 
//                          the user profile collection inside an education array
// ----------------------------------------------------------------------------
exports.addEducationToProfile = (req, res) => {

  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // ES6 way (destructuring because same names)
  const { school, degree, fieldofstudy, from, to, current, description } = req.body;
  const newEducation = {
    school,  // same as school: req.body.school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  // With only 1 DB access: findOneAndUpdate
  Profile.findOneAndUpdate(
    {
      user: req.user.id
    },
    {
      $push: { education: { $each: [newEducation], $position: 0 } } // push at the beginning
    },
    {
      new: true  // return the updated version
    }
  ).then((profile) => {
    res.json(profile)
  }).catch((err) => {
    res.status(400).json(err)
    //res.status(500).json({ 'error': 'error adding new education to profile' });
  })

  /* With 2 DB accesses: findOne + save
  Profile.findOne({ user: req.user.id })
    .then(profile => {

      // ES6 way (destructuring because same names)
      const { school, degree, fieldofstudy, from, to, current, description } = req.body;
      const newEducation = {
        school,  // same as school: req.body.school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };

      // Add to edu array
      profile.education.unshift(newEducation);

      profile.save().then(profile => res.json(profile));
    });
    */
}


// ----------------------------------------------------------------------------
// deleteExperience - A controller method that deletes a particular experience   
//                    from the 'experience' array in the profile collection
// ----------------------------------------------------------------------------
exports.deleteExperience = (req, res) => {

  // 1 DB access: findOneAndUpdate (should create a multikey index on experience array)
  Profile.findOneAndUpdate(
    // { user: req.user.id }, Problem! If the experience doesn't exist it won't give
    //                        any info about that (returns 'profile' cause it found it)    
    {
      user: req.user.id,   // Solution: Query that the experience exists in the array 
      experience: { $elemMatch: { $exists: true } },
      experience: { $elemMatch: { _id: req.params.exp_id } }
    },
    {
      $pull: { experience: { _id: req.params.exp_id } }
    },
    {
      new: true,  // return the updated version
    }
  ).then((profile) => {

    if (!profile) {
      return res.status(404).json({
        error: 'Error deleting experience: There is no experience with this ID',
      });
    }

    res.json(profile);
  }).catch((err) => {
    res.status(400).json(err);
    //res.status(500).json({ 'error': 'error deleting experience from profile' });
  })


  // Traversy version (less efficient) -> Map + 2 DB accesses: findOne + save 
  /*
  Profile.findOne({ user: req.user.id })
    .then(profile => {

      // Get index position
      const removeIndex = profile.experience
        .map(item => item.id)         // transform to an array of 'item.id'
        .indexOf(req.params.exp_id);  // get index of the experience to delete

      //  if no matching is found
      if (removeIndex === -1) {
        return res.status(404).json({
          error: 'There is no experience with this ID',
        });
      }

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Alternative to remove the experience without using Map + IndexOf + Splice
      // NOT TESTED (what happens if no matching is found?)
      // profile.experience.remove({ _id: req.params.exp_id}); 

      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
    */
}


// ----------------------------------------------------------------------------
// deleteEducation - A controller method that deletes a particular education   
//                    from the 'education' array in the profile collection
// ----------------------------------------------------------------------------

exports.deleteEducation = (req, res) => {

  // 1 DB access: findOneAndUpdate (should create a multikey index on education array)
  Profile.findOneAndUpdate(
    {
      user: req.user.id,   // Query that the experience exists in the array 
      education: { $elemMatch: { $exists: true } },
      education: { $elemMatch: { _id: req.params.edu_id } }
    },
    {
      $pull: { education: { _id: req.params.edu_id } }
    },
    {
      new: true,  // return the updated version
    }
  ).then((profile) => {

    if (!profile) {
      return res.status(404).json({
        error: 'Error deleting education: There is no education with this ID',
      });
    }

    res.json(profile);
  }).catch((err) => {
    res.status(400).json(err);
    //res.status(500).json({ 'error': 'error deleting education from profile' });
  })

}

// ----------------------------------------------------------------------------
// deleteUserAndProfile - A controller method that deletes the profile and user 
//                        from both collections
// ----------------------------------------------------------------------------

exports.deleteUserAndProfile = (req, res) => {

  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => User.findOneAndRemove({ _id: req.user.id }))
    .then(() => res.json({ success: true }));
}


// ----------------------------------------------------------------------------
// updateExperience - A controller method that updates a particular experience   
//                    from the 'experience' array in the profile collection
// ----------------------------------------------------------------------------

exports.updateExperience = (req, res) => {

  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // ES6 way (destructuring because same names)
  const { title, company, location, from, to, current, description } = req.body;
  const updatedExperience = {
    _id: req.params.exp_id,  // to avoid that $set changes the _id value
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  // 1 DB access: findOneAndUpdate (should create a multikey index on experience array)
  Profile.findOneAndUpdate(
    {
      user: req.user.id,   // Query that the experience exists in the array 
      experience: { $elemMatch: { $exists: true } },
      experience: { $elemMatch: { _id: req.params.exp_id } }
    },
    {    //'.$' to update only that element in the array
      $set: { 'experience.$': updatedExperience }
    },
    {
      new: true,  // return the updated version
    }
  ).then((profile) => {

    if (!profile) {
      return res.status(404).json({
        error: 'Error updating experience: There is no experience with this ID',
      });
    }

    res.json(profile);
  }).catch((err) => {
    res.status(400).json(err);
    //res.status(500).json({ 'error': 'error updating experience from profile' });
  })

}


// ----------------------------------------------------------------------------
// updateEducation - A controller method that updates a particular education   
//                    from the 'education' array in the profile collection
// ----------------------------------------------------------------------------

exports.updateEducation = (req, res) => {

  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // ES6 way (destructuring because same names)
  const { school, degree, fieldofstudy, from, to, current, description } = req.body;
  const updatedEducation = {
    _id: req.params.edu_id,  // to avoid that $set changes the _id value
    school,                  // same as school: req.body.school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  // 1 DB access: findOneAndUpdate (should create a multikey index on education array)
  Profile.findOneAndUpdate(
    {
      user: req.user.id,   // Query that the experience exists in the array 
      education: { $elemMatch: { $exists: true } },
      education: { $elemMatch: { _id: req.params.edu_id } }
    },
    {
      $set: { 'education.$': updatedEducation }  //'.$' to update only that element in the array
    },
    {
      new: true,  // return the updated version
    }
  ).then((profile) => {

    if (!profile) {
      return res.status(404).json({
        error: 'Error updating education: There is no education with this ID',
      });
    }

    res.json(profile);
  }).catch((err) => {
    res.status(400).json(err);
    //res.status(500).json({ 'error': 'error updating education from profile' });
  })

}


// ----------------------------------------------------------------------------
// getGithubRepos - A controller method that retrieves a list of repositories
//                  for the 'Github username' in the request param.
//                    router.get('/github/:username/:count/:sort'); 
// ----------------------------------------------------------------------------
exports.getGithubRepos = (req, res) => {

  let repos;

  clientId = keys.GITHUB_API_KEY;
  clientSecret = keys.GITHUB_API_SECRET;

  username = req.params.username;
  count = req.params.count;
  sort = req.params.sort;

  const baseUrl = `https://api.github.com/users/${username}/`;
  const perPageParam = `repos?per_page=${count}`;
  const sortParam = `&sort=${sort}`;
  const clientIdParam = `&client_id=${clientId}`;
  const secretParam = `&client_secret=${clientSecret}`;
  const fullUrl = baseUrl + perPageParam + sortParam + clientIdParam + secretParam;

  axios({
    method: "get",
    url: fullUrl,
    responseType: "json"
  })
    .then(result => {
      repos = result.data;

      //return res.json({ repos }); // WHOAAAA! This failed in front-end: 'repos.map' not a function
      return res.json(repos);       // Cannot do a map function over an object
    })
    .catch(err => console.log(err));
}

