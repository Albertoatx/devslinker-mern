/* Use a Functional component  ********************************************
/* (because PostItem doesn't have or use any 'state' or 'lifecycle methods    */
import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// Import 'action creator' function
import { deleteCommentAction } from '../../actions/postActions';


// COMPONENT
const CommentItem = (props) => {

  const { comment, postId, auth } = props;

  const onDeleteClick = (postId, commentId) => {
    props.deleteComment(postId, commentId);
  }

  return (
    // Card body. Make a row divided in columns for: avatar + main content
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>

          {/* Show the delete button ONLY if comment is from the user that is logged in */}
          {comment.user === auth.user.id ? (
            // Surround with Anonymous function so that function is NOT called until we click button
            <button onClick={() => { onDeleteClick(postId, comment._id) }}
              type="button" className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}


CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.auth'
// IMPORTANT! I need to check owner of a post (if from curren user it can be deleted)
// ----------------------------------------------------------------------------
const mapStateToProps = state => ({
  auth: state.auth
});

// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components 
//    (here triggered by user interaction calling 'onDeleteClick') 
//   'dispatch' is a function provided to us by the Redux store.  
// ----------------------------------------------------------------------------  
const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (postId, commentId) => dispatch(deleteCommentAction(postId, commentId)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);