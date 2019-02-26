/* Use a Functional component  ********************************************
/* (because PostItem doesn't have or use any 'state' or 'lifecycle methods    */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// Import 'action creator' function
import { deletePostAction } from '../../actions/postActions';
import { likePostAction } from '../../actions/postActions';


// COMPONENT
const PostItem = (props) => {

  const { post, auth } = props;

  const onDeleteClick = (id) => {
    props.deletePost(id);
  }

  const onLikeClick = (id) => {
    props.likeUnlikePost(id);
  }


  // Find out if the logged in user has liked a particular post
  const findUserLike = (likes) => {

    // Remember that 'likes' is an array with users
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    // Card body. Make a row divided in columns for: avatar + main content
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>

        <div className="col-md-10">
          <p className="lead">{post.text}</p>

          <span>
            {/* Surround with Anonymous function so that function is NOT called until we click button */}
            <button onClick={() => { onLikeClick(post._id) }}
              type="button" className="btn btn-light mr-1">
              {/* <i className='text-info fas fa-heart' /> */}
              <i className={`${findUserLike(post.likes) ? "text-danger" : "text-secondary"} fas fa-heart`} />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>

            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
              </Link>

            {/* Show the delete button ONLY if post is from the user that is logged in */}
            {post.user === auth.user.id ? (
              // Surround with Anonymous function so that function is NOT called until we click button
              <button onClick={() => { onDeleteClick(post._id) }}
                type="button" className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </span>

        </div>
      </div>


    </div>
  )
}


PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likeUnlikePost: PropTypes.func.isRequired,
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
    deletePost: (postId) => dispatch(deletePostAction(postId)),
    likeUnlikePost: (postId) => dispatch(likePostAction(postId)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PostItem);