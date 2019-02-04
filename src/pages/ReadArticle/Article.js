import React, {Component} from 'react';

class Article extends Component {
  render() {
    const {post} = this.props

    return (
      <div dangerouslySetInnerHTML={{__html: post.html}}/>
    );
  }
}

export default Article;
