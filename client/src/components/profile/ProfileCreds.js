import React from 'react';

import PropTypes from 'prop-types';
import Moment from 'react-moment';

/*
class ProfileCreds extends Component {
  render() {
    return (
      <div>
        <h1>TODO: PROFILE CREDENTIALS</h1>
      </div>
    )
  }
}
*/

// COMPONENT
/* Use a Functional component  ********************************************
/* (because ProfileCreds doesn't have or use any 'state' or 'lifecycle methods    */
const ProfileCreds = (props) => {

  const { experiences, educations } = props;

  // List of Experience items
  const experienceItems = experiences.map(exp => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (' Now') : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      <p>
        {exp.location === '' ? null : (
          <span>
            <strong>Location: </strong> {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.description === '' ? null : (
          <span>
            <strong>Description: </strong> {exp.description}
          </span>
        )}
      </p>
    </li>
  ));

  // list of Education items
  const educationItems = educations.map(edu => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (' Now') : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree:</strong> {edu.degree}
      </p>
      <p>
        <strong>Field Of Study:</strong> {edu.fieldofstudy}
      </p>
      <p>
        {edu.description === '' ? null : (
          <span>
            <strong>Description: </strong> {edu.description}
          </span>
        )}
      </p>
    </li>
  ));

  return (
    <div className="row">
      {/* 6 columns on the left side */}
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        {experienceItems.length > 0 ? (
          <ul className="list-group">{experienceItems}</ul>
        ) : (
            <p className="text-center">No Experience Listed</p>
          )}
      </div>

      {/* 6 columns on the right side */}
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>

        {educationItems.length > 0 ? (
          <ul className="list-group">{educationItems}</ul>
        ) : (
            <p className="text-center">No Education Listed</p>
          )}
      </div>
    </div>
  )
}


ProfileCreds.propTypes = {
  experiences: PropTypes.array.isRequired,
  educations: PropTypes.array.isRequired,
}


export default ProfileCreds;