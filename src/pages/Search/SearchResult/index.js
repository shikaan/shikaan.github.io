import React, {Component, Fragment} from 'react';
import {debounce} from "lodash";

import Input from "~components/Input";

import TrendingTopics from './TrendingTopics'
import SearchResultsList from './SearchResultsList'

class SearchResults extends Component {
  state = {
    searchQuery: '',
    searchResults: null,
    trendingTopics: []
  }

  getSearchQuery = () => {
    const {queryString} = this.props

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

  performSearch = debounce(() => {
    const {searchQuery} = this.state
    const {articles} = this.props

    if (searchQuery !== '') {
      const newList = articles
        .filter(({node: article}) => {

          const isInTitle = article.frontmatter.title.toLowerCase().includes(searchQuery)
          const isInTags = article.frontmatter.tags.some(tag => tag.includes(searchQuery))

          return isInTitle || isInTags
        }).slice(0, 5)

      this.setState({searchResults: newList})
    }
  }, 300)

  handleInputChange = (event) => {
    const searchQuery = event.target.value.trim().toLowerCase()

    this.setState({searchQuery}, this.performSearch)
  }

  handleQueryStringChange = () => {
    this.setState({
      searchQuery: this.getSearchQuery(),
    }, this.performSearch)
  }

  componentDidMount() {
    this.setState({
      trendingTopics: this.getTrendingTopics(this.props.articles, 5)
    }, this.handleQueryStringChange())
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryString !== this.props.queryString) {
      this.handleQueryStringChange()
    }
  }

  render() {
    const {content} = this.props
    const {searchQuery, searchResults, trendingTopics} = this.state

    const isFirstSearch = !searchResults
    const hasResults = searchResults && searchResults.length

    return (
      <Fragment>
        <Input
          value={searchQuery}
          placeholder={content.placeholder}
          onChange={this.handleInputChange}/>

        {
          isFirstSearch &&
          <TrendingTopics content={content} trendingTopics={trendingTopics} />
        }
        {
          hasResults
            ? <SearchResultsList content={content} searchResults={searchResults}/>
            : 'Pele'
        }
      </Fragment>
    )
  }
}

export default SearchResults;
