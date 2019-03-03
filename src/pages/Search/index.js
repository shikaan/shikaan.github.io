import React, {Component} from 'react';
import {graphql} from "gatsby";
import {debounce} from 'lodash'

import {en as searchContent} from '/static/content/Search'
import {en as sharedContent} from '/static/content/_shared'

import SearchTemplate from '~templates/Search'

import Input from "~components/Input";
import Card from "~components/Card";
import Heading from "~components/Heading";
import Tag from "~components/Tag";

const content = {...searchContent, shared: sharedContent}

class SearchPage extends Component {
  state = {
    searchResults: null,
    trendingTopics: []
  }

  static computeTrendingTopics = (articles, length = 5) => {
    let topics = []

    for (const {node: article} of articles) {
      const topicsWithoutDuplicates = new Set([...topics, ...article.frontmatter.tags])
      topics = Array.from(topicsWithoutDuplicates)

      if (topics.length >= length) {
        break;
      }
    }

    return topics.slice(0, length)
  }

  performSearch = debounce((searchKey) => {
    const completeList = this.props.data.posts.edges

    const newList = completeList
      .filter(({node: article}) => {

        const isInTitle = article.frontmatter.title.toLowerCase().includes(searchKey)
        const isInTags = article.frontmatter.tags.some(tag => tag.includes(searchKey))

        return isInTitle || isInTags
      }).slice(0, 5)

    this.setState({searchResults: newList})
  }, 500)

  handleInputChange = (event) => {
    const searchKey = event.target.value.trim().toLowerCase()

    this.performSearch(searchKey)
  }

  componentDidMount() {
    this.setState({
      trendingTopics: SearchPage.computeTrendingTopics(this.props.data.posts.edges, 5)
    })
  }

  render() {
    return (
      <SearchTemplate>
        <Input placeholder={content.placeholder} onChange={this.handleInputChange}/>

        {this.state.searchResults && (<ul>
          {
            this.state.searchResults.map(({node}, index) => (
              <li key={index}>
                <Card post={node} content={content}/>
              </li>
            ))
          }
        </ul>)}
        <Heading level={3}>
          {content.subTitle}
        </Heading>
        <ul>
          {
            this.state.trendingTopics.map((topic, index) => (
              <li key={index}>
                <Tag>
                  {topic}
                </Tag>
              </li>
            ))
          }
        </ul>
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
