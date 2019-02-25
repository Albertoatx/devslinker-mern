import React, { Component } from 'react';

// Import custom components
import AddPost from './AddPost';


// COMPONENT
class Posts extends Component {

  render() {

    return (
      <div className="post-feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <AddPost />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Posts;
