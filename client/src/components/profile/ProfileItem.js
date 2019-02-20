/* Use a Functional component  ********************************************
/* (because ProfileItem doesn't have or use any 'state' or 'lifecycle methods    */
import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

// COMPONENT
const ProfileItem = (props) => {

  const { profile } = props;

  const avatar = (<div className="col-2">
    <img src={profile.user.avatar} alt="" className="rounded-circle" />
  </div>)

  return (
    // Card body. Make a row divided in columns for: avatar + main content + list of skills
    <div className="card card-body bg-light mb-3">
      <div className="row">

        {/* avatar - 2 columns */}
        <div className="col-2">
          <img src={profile.user.avatar} alt="" className="rounded-circle" />
        </div>

        {/* main content - 6 columns for large, 4 colums for med, otherwise 8 columns */}
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}
            {' '}
            {isEmpty(profile.company) ? null : (
              <span>at {profile.company}</span>
            )}
          </p>
          <p>
            {isEmpty(profile.location) ? null : (
              <span>{profile.location}</span>
            )}
          </p>
          <Link to={`/profile/${profile.handle}`} className="btn btn-info">
            View Profile
            </Link>
        </div>

        {/* list of skills: if small screens DON'T show, for medium show as block */}
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;