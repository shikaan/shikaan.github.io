import React from "react"
import { graphql } from "gatsby"

import Template from "../templates/Main"

import Bio from "../components/Bio"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import {REPO_BASE_URL} from "../constants";

class BlogPostTemplate extends React.Component {
  buildEditUrl(slug) {
    //FIXME: make me read the source folder of the article rather than semi-hardcode it
    return `${REPO_BASE_URL}/edit/master/content/blog/${slug}/index.md`
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { tags } = this.props.pageContext

    debugger

    return (
      <Template location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.frontmatter.description} />
        <img alt={post.frontmatter.title} src={post.frontmatter.cover_image} />
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.description}</h2>
        {tags.map(i => <p>#{i}</p>)}
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
        <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div>
          <a href={post.frontmatter.comment_link}>Comment on Twitter</a>
          <a href={this.buildEditUrl(post.fields.slug)}>Edit</a>
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
      </Template>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        cover_image
        published
        comment_link
      }
    }
  }
`
