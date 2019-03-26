import React, {Component} from "react";
import {graphql} from "gatsby";

import {debounce, noop, get} from "lodash";

import {en as searchContent} from "/static/content/Search";
import {en as sharedContent} from "/static/content/_shared";

import SearchTemplate from "~templates/Search";
import SEO from "~components/SEO";

import Header from "./Header";
import Results from "./Results";
import Input from "./Input";

const content = {...searchContent, shared: sharedContent};

class SearchPage extends Component {
  static DEBOUNCE_INTERVAL = 300

  state = {
    searchQuery: "",
    searchResults: null,
    trendingTopics: [],
    articles: this.props.data.posts.edges
  };

  getSearchQuery = () => {
    const queryString = get(this.props, "location.search") || "";

    const searchQueryString = queryString.slice(1)
      .split("&")
      .filter(i => i.includes("query"))[0];

    return searchQueryString
      ? searchQueryString.split("=")[1]
      : "";
  };

  getTrendingTopics = (articles, length = 5) => {
    let topics = [];

    for (const {node: article} of articles) {
      const topicsWithoutDuplicates = new Set([...topics, ...article.frontmatter.tags]);
      topics = Array.from(topicsWithoutDuplicates);

      if (topics.length >= length) {
        break;
      }
    }

    return topics.slice(0, length);
  };

  performSearch = debounce(() => {
    const {searchQuery, articles} = this.state;

    if (searchQuery.length > 2) {
      const newList = articles
        .filter(({node: article}) => {
          const isInTitle = get(article, "frontmatter.title", "").toLowerCase().includes(searchQuery);
          const isInTags = get(article, "frontmatter.tags", []).some(tag => tag.includes(searchQuery));

          return isInTitle || isInTags;
        }).slice(0, 5);

      this.setState({searchResults: newList});
    }
  }, SearchPage.DEBOUNCE_INTERVAL);

  setSearchQuery = (searchQuery, callback = noop) => {
    this.setState({searchQuery}, callback);
  };

  handleQueryStringChange = () => {
    this.setState({
      searchQuery: this.getSearchQuery()
    }, this.performSearch);
  };

  componentDidMount() {
    this.setState({
      trendingTopics: this.getTrendingTopics(this.state.articles, 5)
    }, this.handleQueryStringChange);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleQueryStringChange();
    }
  }

  render() {
    const {
      articles,
      searchQuery,
      searchResults,
      trendingTopics
    } = this.state;

    return (
      <SearchTemplate>
        <SEO lang={"en"} title={content.seo.title} description={content.seo.description}/>

        <Header/>

        <Input
          content={content}
          performSearch={this.performSearch}
          articles={articles}
          setSearchQuery={this.setSearchQuery}
          searchQuery={searchQuery}/>

        <Results
          content={content}
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
`;
