import React, {Component, Fragment} from "react";

import Heading from "~components/Heading";
import Icon from "~components/Icon";

class FrontMatter extends Component {
  render() {
    const {post, pageContext} = this.props

    return (
      <Fragment>
        <img alt={post.frontmatter.title} src={post.frontmatter.cover_image}/>
        <Heading level={1}>{post.frontmatter.title}</Heading>
        <Heading level={2}>{post.frontmatter.description}</Heading>
        {pageContext.tags.map(i => <p>#{i}</p>)}
        <p>
          {post.frontmatter.date}
        </p>
      </Fragment>
    )
  }
}

export default FrontMatter;
