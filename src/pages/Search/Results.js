import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";

import Card from "~components/Card";
import Heading, {CONTEXT} from "~components/Heading";
import Tag from "~components/Tag";
import styled from "styled-components";

const ListItem = styled.li`
  padding: 8px 16px;
`

const Section = styled.section`
  padding: 0 16px;
`

class Results extends Component {

  renderEmptyState = () => {
    return (
      <div>
        Empty
      </div>
    )
  }

  renderTrendingTopics = () => {
    const {content, trendingTopics} = this.props

    return (
      <Fragment>
        <Heading level={3} context={CONTEXT.DISPLAY}>
          {content.subTitle}
        </Heading>
        <ul>
          {
            trendingTopics.map((topic, index) => (
              <ListItem key={index}>
                <Tag to={`/search?query=${topic}`} replace>
                  {topic}
                </Tag>
              </ListItem>
            ))
          }
        </ul>
      </Fragment>
    )
  }

  renderResultList = () => {
    const {content, searchResults} = this.props

    return (
      <ul>
        {
          searchResults.map(({node}, index) => (
            <li key={index}>
              <Card post={node} content={content} tagHistoryReplace/>
            </li>
          ))
        }
      </ul>
    )
  }

  render() {
    const {searchResults} = this.props;

    const isFirstSearch = !searchResults
    const hasResults = searchResults && !!searchResults.length

    return (
      <Section>
        {
          isFirstSearch && this.renderTrendingTopics()
        }

        {
          hasResults && this.renderResultList()
        }

        {
          !isFirstSearch && !hasResults && this.renderEmptyState()
        }
      </Section>
    );
  }
}

Results.propTypes = {
  content: PropTypes.any,
  searchResults: PropTypes.any
}

export default Results;
