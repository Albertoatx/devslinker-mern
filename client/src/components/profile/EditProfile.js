import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

// Components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

// Action to dispatch (will be the 'mapDispatchToProps' param)
import { createProfileAction } from '../../actions/profileActions';
import { getCurrentProfileAction } from '../../actions/profileActions';


// COMPONENT
class EditProfile extends Component {

  // Define state for our form fields
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    //errors: {}
  };


  /**
   * componentDidMount Lifecycle Method.
   * It is the last 'Mounting' method and it is invoked immediately after 
   * a component is mounted (inserted into the DOM tree)
   */
  componentDidMount() {
    //console.log('componentDidMount()');
    this.props.getCurrentProfile(); // dispatch action to call API endpoint
  }


  /**
   * componentWillReceiveProps Lifecycle Method.
   * That name will continue to work until version 17 (where will be DEPRECATED)
   * 
   * It is invoked before a mounted component receives new props.
   * If you need to update the state in response to prop changes 
   * (for example, to reset it), you may compare 'this.props' and 'nextProps'
   * and perform state transitions using this.setState() in this method.
   * 
   * TESTED: It works!!! But if error when sending form it will fill inputs 
   *         with previous values, so we have to type again
   */
  componentWillReceiveProps(nextProps) {

    //console.log('componentWillReceiveProps()');

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';  

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });

    } 
    

    // To stay DRY (it works but if error forces us to retype all inputs we want to change)
    // if (nextProps.profile.profile) {
    //   const { skills, social, ...profile } = nextProps.profile.profile;
    //   this.setState(prevState => ({
    //       ...prevState,
    //       ...profile,
    //       ...social,
    //       skills: skills.join(',')
    //   }))
    // }
    
  }


  /**
   * componentDidUpdate Lifecycle Method.
   * (ALTERNATIVE to 'componentWillReceiveProps' which will be deprecated)
   * 
   * It is the last 'Updating' method (caused by changes to 'props' or 'state')
   * For example: typing a letter in any input field will trigger the 'render'
   * and 'componentDidUpdate' method (because component 'state' changes).
   * 
   * TESTED: It works!!!
   */
  /*
  componentDidUpdate(prevProps){

    const { profile } = this.props;
    //console.log('componentDidUpdate()');
    //console.log({prevProps});
    //console.log({profile});

    // VERY IMPORTANT! To avoid Maximum update depth exceeded
    // Typical usage (DON'T forget to compare props to avoid infinite loop)
    // In this case it will only run this code when we 'submit' an API request 
    // to an endpoint because in that case 'loading' changes (and this will 
    // when we click 'submit' or at first entry when clicking 'edit')
    if (this.props.profile.loading !== prevProps.profile.loading) {

      if (profile.profile) {

        // fill the component 'state' with what is coming from 'redux' state'
        // ------------------------------------------------------------------
        const currentProfile = profile.profile;

        // Bring skills array back to CSV using 'join' function
        const skillsCSV = currentProfile.skills.join(',');

        // If currentProfile field doesnt exist, make empty string
        currentProfile.company = !isEmpty(currentProfile.company) ? currentProfile.company : '';
        currentProfile.website = !isEmpty(currentProfile.website) ? currentProfile.website : '';
        currentProfile.location = !isEmpty(currentProfile.location) ? currentProfile.location : '';
        currentProfile.bio = !isEmpty(currentProfile.bio) ? currentProfile.bio : '';
        currentProfile.social = !isEmpty(currentProfile.social) ? currentProfile.social : {}; 

        currentProfile.githubusername = !isEmpty(currentProfile.githubusername)
          ? currentProfile.githubusername
          : '';

        currentProfile.twitter = !isEmpty(currentProfile.social.twitter)
          ? currentProfile.social.twitter
          : '';

        currentProfile.facebook = !isEmpty(currentProfile.social.facebook)
          ? currentProfile.social.facebook
          : '';

        currentProfile.linkedin = !isEmpty(currentProfile.social.linkedin)
          ? currentProfile.social.linkedin
          : '';

        currentProfile.youtube = !isEmpty(currentProfile.social.youtube)
          ? currentProfile.social.youtube
          : '';

        currentProfile.instagram = !isEmpty(currentProfile.social.instagram)
          ? currentProfile.social.instagram
          : '';

        // Set component fields state
        this.setState({
          handle: currentProfile.handle,
          company: currentProfile.company,
          website: currentProfile.website,
          location: currentProfile.location,
          status: currentProfile.status,
          skills: skillsCSV,
          githubusername: currentProfile.githubusername,
          bio: currentProfile.bio,
          twitter: currentProfile.twitter,
          facebook: currentProfile.facebook,
          linkedin: currentProfile.linkedin,
          youtube: currentProfile.youtube,
          instagram: currentProfile.instagram
        }); 
        
      }
    } 
  }
  */
  

  /**
   * getDerivedStateFromProps Lifecycle Method.
   * (ALTERNATIVE to 'componentWillReceiveProps' which will be deprecated)
   * 
   * It is invoked right before calling the render method, both on the 
   * initial mount and on subsequent updates.
   * It should return an object to update the state, or null to update nothing.
   * 
   * This method exists for rare use cases where the state depends on 
   * changes in props over time. 
   * 
   * Deriving state leads to verbose code and makes your components difficult 
   * to think about. Make sure you’re familiar with simpler alternatives 
   * 
   * Note that this method is fired on every render, regardless of the cause. 
   * This is in contrast to 'componentWillReceiveProps', which only fires
   * when the parent causes a re-render and not as a result of a local setState. 
   * 
   * TESTED: It DIDNT work! Does NOT allow to Edit the input fields
   */
  /*
  static getDerivedStateFromProps(nextProps) {
    console.log('getDerivedStateFromProps()');

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      
      // bring skills array back to csv
      const skillsCSV = Array.isArray(profile.skills)
      ? profile.skills.join(", ")
      : profile.skills;
      
      // if profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
      ? profile.githubusername
      : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
      ? profile.social.twitter
      : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
      ? profile.social.linkedin
      : "";
      profile.youtube = !isEmpty(profile.social.youtube)
      ? profile.social.youtube
      : "";
      profile.instagram = !isEmpty(profile.social.instagram)
      ? profile.social.instagram
      : "";
      profile.skills = skillsCSV;
      
      return {
        handle: profile.handle,
        status: profile.status,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        githubusername: profile.githubusername,
        bio: profile.bio,
        social: profile.social,
        twitter: profile.twitter,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
        skills: profile.skills
      };
    } 

    return null;
  }
  */

  // Put whatever is typed in our input fields in our component 'state'
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }


  // When we click on Submit button
  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    // We DON'T need 'withRouter' because component 'editProfile' is routed by <Route>
    this.props.editProfile(profileData, this.props.history);
  }


  render() {
    //console.log('render()');
    const { errors } = this.props; /* with this I don't need 'componentWillReceiveProps' */

    const { displaySocialInputs } = this.state;

    // options to select for status
    const options = [
      { label: '* Select Professional Status', value: '' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];


    // DOESN'T WORK: Cannot read property 'handle' of null ...
    //const { profile } = this.props.profile; /* profile = this.props.profile.profile */

    /* create a variable to hold the social inputs */
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            //value={(profile.social.twitter ? profile.social.twitter : '')}
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            //value={(profile.social.facebook ? profile.social.facebook : '')}
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            //value={(profile.social.linkedin ? profile.social.linkedin : '')}
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            //value={(profile.social.youtube ? profile.social.youtube : '')}
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            //value={(profile.social.instagram ? profile.social.instagram : '')}
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              
              <h1 className="display-4 text-center">Edit your profile</h1>
              <small className="d-block pb-3">* = required fields</small>

              {/* FORM */}
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  type="text"
                  //value={profile.handle ? profile.handle : ''}
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  //value={(profile.status ? profile.status : '')}
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  //value={(profile.company ? profile.company : '')}
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  //value={(profile.website ? profile.website : '')}
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  //value={(profile.location ? profile.location : '')}
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  //value={profile.skills.join(',')}
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />

                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  //value={(profile.githubusername ? profile.githubusername : '')}
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  //value={(profile.bio ? profile.bio : '')}
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                {/* toggle display social inputs using 'setState' */}
                <div className="mb-3">
                  <button type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>

              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,       // type object
  errors: PropTypes.object.isRequired,        // type object
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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
  //console.log('mapDispatchToProps()');
  return {
    getCurrentProfile: () => dispatch(getCurrentProfileAction()),
    editProfile: (profileData, history) => dispatch(createProfileAction(profileData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { editProfile: createProfileAction, 
// getCurrentProfile; getCurrentProfileAction})
// (EditProfile); 