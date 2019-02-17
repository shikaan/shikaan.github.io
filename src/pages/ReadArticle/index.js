import React from "react"
import {graphql} from "gatsby"

import Template from "~templates/Main"

import Divider from "~components/Divider"
import Bio from "~components/Bio"
import SEO from "~components/seo"

import CallToActions from "./CallToActions";
import FrontMatter from "./FrontMatter";
import TableOfContents from "./TableOfContents";
import Article from "./Article";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Template location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.frontmatter.description}/>

        <FrontMatter post={post} pageContext={this.props.pageContext}/>
        <Divider/>
        <TableOfContents post={post}/>
        <Divider/>
        <Article post={post}/>
        <Divider/>
        <CallToActions post={post}/>
        <Divider/>
        <hr/>
        <Bio/>
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
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        commentLink
        coverImage {
          childImageSharp {
            fluid {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`
