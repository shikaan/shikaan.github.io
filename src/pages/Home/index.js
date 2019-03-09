import React from 'react'
import {graphql, Link} from 'gatsby'

import Template from '~templates/Main'

class HomePage extends React.Component {
  render() {
    const {data} = this.props

    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Template location={this.props.location} title={siteTitle}>
        {posts.map(({node}) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link style={{boxShadow: `none`}} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{__html: node.excerpt}}/>
            </div>
          )
        })}
      </Template>
    )
  }
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 5, 
      sort: {
        fields: [frontmatter___date], order: DESC
      }
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              minutes
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            coverImage {
              childImageSharp {
                fixed(width:112, height:112) {
                  width
                  height
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`
