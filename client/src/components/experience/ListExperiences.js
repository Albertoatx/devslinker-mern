/* CONVERT IT to a Functional component  ********************************************
/* (because ListExperience doesn't have or use any 'state' or 'lifecycle methods    */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = (props) => {

  const { experiences, deleteExp } = props;

  const experienceList = experiences.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {}
        {exp.to === null ? (
          'Now'
        ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
      </td>
      <td>
        {/* Wrap 'onDeleteClick' inside a function to keep it from going off automatically */}
        <button
          onClick={() => deleteExp(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experienceList}
        </tbody>
      </table>
    </div>
  );
}

Experience.propTypes = {
  deleteExp: PropTypes.func.isRequired
}

export default Experience;

/* As a class component ****************************************************** */
/*
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

// Action to dispatch (will be the 'mapDispatchToProps' param)
import { deleteExperienceAction } from '../../actions/profileActions';

// Class COMPONENT
class Experience extends Component {

  onDeleteClick = id => {
    this.props.deleteExperience(id);
  }

  render() {
    // array of Experiences passed from 'dashboard in 'this.props'
    const experienceList = this.props.experiences.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {}
          {exp.to === null ? (
            'Now'
          ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
        </td>
        <td>

          <button
            onClick={() => this.onDeleteClick(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {experienceList}
          </tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};


// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components (here in 'on submit')
//   'dispatch' is a function provided to us by the Redux store.
// ----------------------------------------------------------------------------
const mapDispatchToProps = (dispatch) => {
  //console.log('mapDispatchToProps()');
  return {
    deleteExperience: (expId) => dispatch(deleteExperienceAction(expId)),
  }
}

export default connect(null, mapDispatchToProps)(Experience);
*/
