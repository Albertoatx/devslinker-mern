/* Use a Functional component  ********************************************
/* (because CommentList doesn't have or use any 'state' or 'lifecycle methods    */
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';


// COMPONENT
const ListComments = (props) => {

  const { comments, postId } = props;

  return comments.map(comment => (
    <CommentItem
      key={comment._id}
      comment={comment}
      postId={postId}
    />
  ));
}

ListComments.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default ListComments;
