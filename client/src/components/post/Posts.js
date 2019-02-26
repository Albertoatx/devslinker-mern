import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import custom components
import AddPost from './AddPost';
import Spinner from '../common/Spinner';
import PostItem from './PostItem';

// Import 'action creator' function
import { getAllPostsAction } from '../../actions/postActions';


// COMPONENT
class Posts extends Component {

  /* good place for Ajax API requests which don't require user interaction */
  componentDidMount() {
    this.props.getPosts();
  }

  render() {

    const { posts, loading } = this.props.post;

    let postItems;

    if (posts === null || loading) {
      postItems = <Spinner />;
    } else {
      if (posts.length > 0) {
        postItems = posts.map(post => (
          <PostItem key={post._id} post={post} />
        ));
      } else {
        postItems = <h4>No posts found...</h4>;
      }
    }


    return (
      <div className="post-feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <AddPost />
              {postItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Define types (strings, etc) to know what types to expect for our incoming data
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

// Map 'Redux state' to the 'props' of this component so that we can use them
//      here by using 'this.props.post'
// ----------------------------------------------------------------------------
const mapStateToProps = state => ({
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
    getPosts: () => dispatch(getAllPostsAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

// Using mapDispatchToProps() SHORTHAND Notation!
// (avoid the boilerplate code in mapDispatchToProps() for the common case  )
// (where the 'action creator arguments' match the 'callback prop arguments')
// ----------------------------------------------------------------------------
//export default connect(mapStateToProps, { getPosts: getAllPostsAction })(Posts);
