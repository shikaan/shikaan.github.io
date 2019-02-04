import React, {Component} from "react";

import {rhythm, scale} from "~utils/typography"

class FrontMatter extends Component {
  render() {
    const {post, pageContext} = this.props

    return (
      <React.Fragment>
        <img alt={post.frontmatter.title} src={post.frontmatter.cover_image}/>
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.description}</h2>
        {pageContext.tags.map(i => <p>#{i}</p>)}
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
      </React.Fragment>
    )
  }
}

export default FrontMatter;
