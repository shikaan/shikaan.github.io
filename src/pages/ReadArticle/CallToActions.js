import React, {Component} from "react";

import {FacebookShareButton, TwitterShareButton} from "react-share";

import {REPO_BASE_URL} from "~/constants";

class CallToActions extends Component {
  buildEditUrl(slug) {
    //FIXME: make me read the source folder of the article rather than semi-hardcode it
    return `${REPO_BASE_URL}/edit/master/content/blog${slug}index.md`
  }

  share(post) {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
        title: document.title,
        text: post.frontmatter.title
      })
    }
  }


  render() {
    const {post} = this.props

    return (
      <div>
        <a href={post.frontmatter.comment_link}>Comment on Twitter</a>
        &nbsp;
        <a href={this.buildEditUrl(post.fields.slug)}>Edit</a>
        &nbsp;
        <FacebookShareButton url={window.location.href}>Facebook</FacebookShareButton>
        <TwitterShareButton url={window.location.href}>Twitter</TwitterShareButton>
      </div>
    )
  }
}

export default CallToActions;
