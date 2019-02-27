import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import custom components
import Spinner from '../common/Spinner';
import PostItem from './PostItem';
import AddComment from '../comment/AddComment';

// Import 'action creator' function
import { getPostDetailAction } from '../../actions/postActions';

// COMPONENT
class PostDetail extends Component {

  /* good place to make Ajax endpoint requests which don't require user interaction */
  componentDidMount() {

    // get the 'id' param in the URL using 'props.match.params' injected by <Route>
    if (this.props.match.params.id) {
      this.props.getPostDetail(this.props.match.params.id);
    }
  }

  render() {

    const { post, loading } = this.props.post;

    let postContent;

    // if we set 'payload: null' in getPostDetailAction
    // if (post === null || Object.keys(post).length === 0 || loading) {

    //if we set 'payload: {}' in getPostDetailAction  
    if (Object.keys(post).length === 0 || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/post-feed" className="btn btn-light mb-3 float-left">
                Back To Posts
              </Link>
            </div>
            <div className="col-md-6" />
          </div>

          <PostItem post={post} showActions={false} />
          <AddComment postId={post._id} />
        </div>
      );
    }

    return (
      <div className="post-detail">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{postContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data 
PostDetail.propTypes = {
  post: PropTypes.object.isRequired,           // type object
  getPostDetail: PropTypes.func.isRequired   // type func
};


// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.post'
// ----------------------------------------------------------------------------
const mapStateToProps = (state) => ({
  post: state.post
});

// Using mapDispatchToProps() STANDARD Notation
// Attach 'Actions' to 'props' of this component so that it will dispatch them
//    That way those actions can be called from our components 
//    (here in 'componentDidMount' because it is NOT triggered by user interaction) 
//   'dispatch' is a function provided to us by the Redux store.  
// ----------------------------------------------------------------------------  
const mapDispatchToProps = (dispatch) => {
  return {
    getPostDetail: (postId) => dispatch(getPostDetailAction(postId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);


// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { getPostDetail: getPostDetailAction })(PostDetail);

