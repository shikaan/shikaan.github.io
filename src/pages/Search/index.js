import React, {Component} from 'react';
import {graphql} from "gatsby";
import {debounce} from 'lodash'

import {en as searchContent} from '/static/content/Search'
import {en as sharedContent} from '/static/content/_shared'

import SearchTemplate from '~templates/Search'

import Icon from "~components/Icon";
import Button from "~components/Button";

import SearchResults from "./SearchResult";

const content = {...searchContent, shared: sharedContent}

class SearchPage extends Component {
  render() {
    return (
      <SearchTemplate>
        <Button onClick={() => window.history.back()}>
          <Icon>
            close
          </Icon>
        </Button>

        <SearchResults
          content={content}
          articles={this.props.data.posts.edges}
          queryString={this.props.location.search}
        />

      </SearchTemplate>
    );
  }
}

export default SearchPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
      limit: 1000, 
      sort: {
        fields: [frontmatter___date], order: DESC
      }) {
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
