import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// custom components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

// Action to dispatch (will be the 'mapDispatchToProps' param)
import { addExperienceAction } from '../../actions/profileActions';


// COMPONENT
class AddExperience extends Component {

  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    disabled: false,
    currentJob: false, // if sb clicks 'currentJob' checkbox -> make 'disabled' = true
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
      currentJob: !this.state.currentJob,
    }));
  }

  // When we click on Submit button
  onSubmit = e => {
    e.preventDefault();

    // experience to add 
    const newExperience = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: (this.state.disabled ? null : this.state.to),
      current: this.state.currentJob,
      description: this.state.description
    };

    // To use 'props.history' We DON'T need 'withRouter' because component 'AddExperience'
    // is routed by <Route> (which adds 'history' to props)
    this.props.addExperience(newExperience, this.props.history);
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
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
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
                    name="currentjob"
                    value={this.state.currentJob}
                    checked={this.state.currentJob}
                    onChange={this.onCheck}
                    id="currentjob"
                  />
                  <label htmlFor="currentjob" className="form-check-label">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the the position"
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
AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,       // type object
  errors: PropTypes.object.isRequired,        // type object
  addExperience: PropTypes.func.isRequired,   // type func
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
    addExperience: (expData, history) => dispatch(addExperienceAction(expData, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { addExperience: addExperienceAction, 
// })
// (AddExperience); 
