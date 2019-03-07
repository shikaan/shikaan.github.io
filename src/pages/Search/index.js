import React, {Component} from 'react';
import {graphql} from "gatsby";

import {debounce} from "lodash";

import {en as searchContent} from '/static/content/Search'
import {en as sharedContent} from '/static/content/_shared'

import SearchTemplate from '~templates/Search'

import Header from "./Header";
import Results from "./Results";
import Input from "./Input";

const content = {...searchContent, shared: sharedContent}

class SearchPage extends Component {
  state = {
    searchQuery: '',
    searchResults: null,
    trendingTopics: [],
    articles: this.props.data.posts.edges
  }

  getSearchQuery = () => {
    const queryString = this.props.location.search

    const searchQueryString = queryString.slice(1)
      .split('&')
      .filter(i => i.includes('query'))[0]

    return searchQueryString
      ? searchQueryString.split('=')[1]
      : ''
  }

  getTrendingTopics = (articles, length = 5) => {
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

  setSearchQuery = (searchQuery, callback = Function()) => {
    this.setState({searchQuery}, callback)
  }

  setSearchResults = (searchResults, callback = Function()) => {
    this.setState({searchResults}, callback)
  }

  handleQueryStringChange = () => {
    this.setState({
      searchQuery: this.getSearchQuery(),
    }, this.performSearch)
  }

  componentDidMount() {
    this.setState({
      trendingTopics: this.getTrendingTopics(this.state.articles, 5)
    }, this.handleQueryStringChange)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleQueryStringChange()
    }
  }

  performSearch = debounce(() => {
    const {searchQuery, articles} = this.state

    if (searchQuery.length > 2) {
      const newList = articles
        .filter(({node: article}) => {

          const isInTitle = article.frontmatter.title.toLowerCase().includes(searchQuery)
          const isInTags = article.frontmatter.tags.some(tag => tag.includes(searchQuery))

          return isInTitle || isInTags
        }).slice(0, 5)

      this.setState({searchResults: newList})
    }
  }, 300)

  render() {
    const {
      articles,
      searchQuery,
      searchResults,
      trendingTopics
    } = this.state

    return (
      <SearchTemplate>
        <Header/>

        <Input
          content={content}
          performSearch={this.performSearch}
          articles={articles}
          setSearchQuery={this.setSearchQuery}
          searchQuery={searchQuery}/>

        <Results
          content={content}
          setSearchResults={this.setSearchResults}
          searchResults={searchResults}
          trendingTopics={trendingTopics}
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
