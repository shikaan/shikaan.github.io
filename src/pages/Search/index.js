import React, {Component} from "react";
import {debounce, noop, get} from "lodash";
import {graphql} from "gatsby";

import SearchTemplate from "~templates/Search";
import SEO from "~components/SEO";
import {getSection} from "~/utils";

import Results from "./Results";
import Input from "./Input";

class SearchPage extends Component {
  static DEBOUNCE_INTERVAL = 300

  state = {
    searchQuery: "",
    searchResults: null,
    trendingTopics: [],
    articles: this.props.data.posts.edges,
    content: this.props.data.content
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
      const topicsWithoutDuplicates = new Set([...topics, ...(article.tags ?? [])]);
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
          const isInTitle = (article.title || "").toLowerCase().includes(searchQuery);
          const isInTags = (article.tags || []).some(tag => tag.includes(searchQuery));

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
      trendingTopics,
      content
    } = this.state;

    const mainContent = getSection(content?.sections, "search.main");
    const emptyContent = getSection(content?.sections, "search.empty");

    return (
      <SearchTemplate>
        <SEO
          lang={"en"}
          title={content.title}
          description={content?.description?.description}
          keywords={content.keywords ?? []}
          slug={"/search"}
        />

        <Input
          content={mainContent}
          performSearch={this.performSearch}
          articles={articles}
          setSearchQuery={this.setSearchQuery}
          searchQuery={searchQuery}/>

        <Results
          content={{mainContent, emptyContent}}
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
    content: contentfulPage(reference: { eq: "search" }) {
      title
      description {
        description
      }
      keywords
      sections {
        title
        subtitle
        reference
        microcopy {
          reference
          value
        }
      }
    }
    posts: allContentfulArticle (
        limit: 1000,
        sort: {
            fields: [publishDate], order: DESC
        }
    ) {
        edges {
            node {
                slug
                title
                publishDate(formatString: "MMMM DD, YYYY")
                tags
                body {
                    childMarkdownRemark {
                        timeToRead
                    }
                }
                coverImage {
                    fluid {
                        ...GatsbyContentfulFluid
                    }
                }
            }
        }
    }
  }
`;
