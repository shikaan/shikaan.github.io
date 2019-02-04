import React, {Component} from 'react';

class TableOfContents extends Component {
  render() {
    const {post} = this.props

    return <div dangerouslySetInnerHTML={{__html: post.tableOfContents}}/>  }
}

export default TableOfContents;
