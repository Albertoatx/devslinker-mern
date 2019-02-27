import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import custom components
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

// Import 'action creator' function
import { addCommentAction } from '../../actions/postActions';


// COMPONENT
class AddComment extends Component {

  state = {
    text: '',
    //errors: {}
  };

  // Put whatever is typed in our input fields in our component 'state'
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // When we click on Submit button
  onSubmit = e => {
    e.preventDefault();

    const newComment = {
      text: this.state.text,
      //name: user.name,    Better pulling it from 'req.user' (after Passport authenticates the request)
      //avatar: user.avatar
    };

    this.props.addComment(this.props.postId, newComment);

    // TODO: clear the message only if request succeeded
    this.setState({ text: '' });
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.errors) {
  //     this.setState({ errors: newProps.errors });
  //   }
  // }

  render() {
    // const { errors } = this.state;
    const { errors } = this.props; /* with this I don't need 'componentWillReceiveProps' */

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a comment...</div>
          <div className="card-body">

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.errors'
const mapStateToProps = state => ({
  errors: state.errors
});

// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components (here in 'on submit') 
//   'dispatch' is a function provided to us by the Redux store.  
// ----------------------------------------------------------------------------  
const mapDispatchToProps = (dispatch) => {

  return {
    addComment: (postId, commentData) => dispatch(addCommentAction(postId, commentData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);