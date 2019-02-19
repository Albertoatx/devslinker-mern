import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// custom components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

// Action to dispatch (will be the 'mapDispatchToProps' param)
import { addEducationAction } from '../../actions/profileActions';


// COMPONENT
class AddEducation extends Component {

  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    disabled: false,
    currentSchool: false, // if sb clicks 'currentJob' checkbox -> make 'disabled' = true
    description: '',
    //errors: {},
  }

  // Put whatever is typed in our input fields in our component 'state'
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Change 'current' and 'disabled' to the opposite of what they are
  onCheck = e => {
    this.setState((prevState) => ({
      /* clear 'To Date' input if we pass from disabled false to true */
      to: (prevState.disabled ? this.state.to : ''),
      disabled: !this.state.disabled,
      currentSchool: !this.state.currentSchool,
    }));
  }

  // When we click on Submit button
  onSubmit = e => {
    e.preventDefault();

    // Education to add to the DB
    const newEducation = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: (this.state.disabled ? null : this.state.to),
      current: this.state.currentSchool,
      description: this.state.description
    };

    // To use 'props.history' We DON'T need 'withRouter' because component 'AddEducation'
    // is routed by <Route> (which adds 'history' to props)
    this.props.addEducation(newEducation, this.props.history);
  }

  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  */

  render() {
    const { errors } = this.props; /* with this I don't need 'componentWillReceiveProps' */

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />

                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />

                <h6>* From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                {/* checkbox */}
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="currentschool"
                    value={this.state.currentSchool}
                    checked={this.state.currentSchool}
                    onChange={this.onCheck}
                    id="currentschool"
                  />
                  <label htmlFor="currentschool" className="form-check-label">
                    Current School
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,       // type object
  errors: PropTypes.object.isRequired,        // type object
  addEducation: PropTypes.func.isRequired,   // type func
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.profile' and 'this.props.errors'
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components (here in 'on submit') 
//   'dispatch' is a function provided to us by the Redux store.  
// ----------------------------------------------------------------------------  
const mapDispatchToProps = (dispatch) => {

  return {
    addEducation: (eduData, history) => dispatch(addEducationAction(eduData, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { addEducation: addEducationAction, 
// })
// (AddEducation); 
