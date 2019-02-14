import React, {Component} from "react";

import {Heading} from "~components/Heading";

class FrontMatter extends Component {
  render() {
    const {post, pageContext} = this.props

    return (
      <React.Fragment>
        <img alt={post.frontmatter.title} src={post.frontmatter.cover_image}/>
        <Heading level={1}>{post.frontmatter.title}</Heading>
        <Heading level={2}>{post.frontmatter.description}</Heading>
        {pageContext.tags.map(i => <p>#{i}</p>)}
        <p>
          {post.frontmatter.date}
        </p>
      </React.Fragment>
    )
  }
}

export default FrontMatter;
