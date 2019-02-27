import React from "react"
import {graphql} from "gatsby"

import {en as content} from '/static/content/ReadArticle'

import Template from "~templates/Main"

import Divider from "~components/Divider"
import SEO from "~components/seo"

import CallToActions from "./CallToActions";
import FrontMatter from "./FrontMatter";
import TableOfContents from "./TableOfContents";
import Article from "./Article";
import Newsletter from "./Newsletter";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Template location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.frontmatter.description}/>

        <FrontMatter post={post} pageContext={this.props.pageContext} content={content}/>
        <Divider/>
        <TableOfContents post={post} content={content}/>
        <Divider/>
        <Article post={post}/>
        <CallToActions post={post} content={content}/>
        <Divider/>
        <Newsletter content={content}/>
      </Template>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      tableOfContents(
        maxDepth: 2
      )
      fields {
        slug
        relativeFilePath
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
