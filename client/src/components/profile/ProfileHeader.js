import React from 'react';

import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

/*
class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <h1>TODO: PROFILE Header</h1>
      </div>
    )
  }
}*/


// COMPONENT
/* Use a Functional component  ********************************************
/* (because ProfileHeader doesn't have or use any 'state' or 'lifecycle methods    */
const ProfileHeader = (props) => {

  const { profile } = props;

  // To stay DRY
  const renderSocialLinks = (socObj) => {
    return Object.keys(socObj).map(key => {
      if (socObj[key]) {
        const link = `${socObj[key]}`;
        return (
          <a className="text-white p-2"
            key={key}
            href={link}
            rel="noopener noreferrer"
            target="_blank">
            <i className={`fab fa-${key} fa-2x`} />
          </a>
        );
      } else
        return null;
    });
  };

  // <a
  //   className="text-white p-2"
  //   href={profile.social.linkedin}
  //   target="_blank"
  // >
  //   <i className="fab fa-linkedin fa-2x" />
  // </a>

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

            {/* check website + social icons */}
            {/* To stay DRY */}
            <p>
              {isEmpty(profile.website) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}

              {isEmpty(profile.social) ? null : renderSocialLinks(profile.social)}
            </p>


            {/* check website + social icons */}
            {/*
            <p>
              {isEmpty(profile.website) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.website}
                  target="_blank"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}

              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.twitter}
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}

              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.facebook}
                  target="_blank"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}

              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.linkedin}
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}

              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.youtube}
                  target="_blank"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}

              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <a
                  className="text-white p-2"
                  href={profile.social.instagram}
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
            </p> */}

          </div>
        </div>
      </div>
    </div>
  )
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileHeader;