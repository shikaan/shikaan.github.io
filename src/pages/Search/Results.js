import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import emptyStateImage from '/static/empty-state.png'

import Card from '~components/Card'
import Link from '~components/Link'
import Heading, { CONTEXT } from '~components/Heading'
import Tag from '~components/Tag'
import Image from '~components/Image'

const Section = styled.section`
  padding: 0 16px 40px 16px;
`

const ListItem = styled.li`
  padding: 8px 16px;
`

const EmptyStateHeading = styled(Heading)`
  font-size: 32px;
  
  & + small {
    padding: 16px 0;
  }
`

const EmptyStateWrapper = styled.div`
  text-align: center;
`

const EmptyStateImage = styled(Image)`
  height: 200px;
  margin: auto;
  padding: 24px;
`
const EmptyStateParagraph = styled.p`
  padding: 24px 24px;
`

const EmptyStateLink = styled(Link)(({ theme }) => `
  text-decoration: underline;
`)

class Results extends Component {
  showTrendingTopics = () => {
    const { setSearchResults } = this.props

    setSearchResults(null)
  };

  renderEmptyState = () => {
    const { content } = this.props

    return (
      <EmptyStateWrapper>
        <EmptyStateHeading level={3} context={CONTEXT.DISPLAY} sub={content.emptyState.subTitle}>
          {content.emptyState.title}
        </EmptyStateHeading>
        <EmptyStateImage src={emptyStateImage}/>
        <EmptyStateParagraph>
          {content.emptyState.parapgraph}
        </EmptyStateParagraph>
        <EmptyStateLink onClick={() => this.showTrendingTopics()}>
          {content.emptyState.cta}
        </EmptyStateLink>
      </EmptyStateWrapper>
    )
  };

  renderTrendingTopics = () => {
    const { content, trendingTopics } = this.props

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
  };

  renderResultList = () => {
    const { content, searchResults } = this.props

    return (
      <ul>
        {
          searchResults.map(({ node }, index) => (
            <li key={index}>
              <Card post={node} content={content} tagHistoryReplace/>
            </li>
          ))
        }
      </ul>
    )
  };

  render () {
    const { searchResults } = this.props

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
    )
  }
}

Results.propTypes = {
  content: PropTypes.any,
  searchResults: PropTypes.any
}

export default Results
