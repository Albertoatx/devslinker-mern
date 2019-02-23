import React from 'react';

import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

/*
class ProfileAbout extends Component {
  render() {
    return (
      <div>
        <h1>TODO: PROFILE ABOUT</h1>
      </div>
    )
  }
}
*/

// COMPONENT
/* Use a Functional component  ********************************************
/* (because ProfileAbout doesn't have or use any 'state' or 'lifecycle methods    */
const ProfileAbout = (props) => {

  const { profile } = props;

  // Get first name
  const firstName = profile.user.name.trim().split(' ')[0];

  // Skill List
  const skills = profile.skills.map((skill, index) => (
    <div key={index} className="p-3">
      <i className="fa fa-check" /> {skill}
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          {isEmpty(profile.bio) ? null : (
            <div>
              <h3 className="text-center text-info">
                {firstName}'s Bio
            </h3>
              <p className="lead">{profile.bio}</p>
              <hr />
            </div>
          )}

          {isEmpty(profile.skills) ? null : (
            <div>
              <h3 className="text-center text-info">Skill Set</h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {skills}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}


export default ProfileAbout;