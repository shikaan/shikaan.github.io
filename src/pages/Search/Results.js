import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {sample} from 'lodash'

import emptyStateImage from '/static/empty-state.png'

import Card from '~components/Card'
import Link, {navigate} from '~components/Link'
import Heading, {CONTEXT} from '~components/Heading'
import Tag from '~components/Tag'
import Image from '~components/Image'

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.horizontalPadding};
`)

const ListItem = styled.li(({theme}) => `
  padding: ${theme.templateVariables.horizontalPadding.multiply(.5)} ${theme.templateVariables.horizontalPadding};
`)

const EmptyStateHeading = styled(Heading)(({theme}) => `
  font-size: ${theme.typography.baseFontSize.multiply(2)};
  
  & + small {
    padding: ${theme.templateVariables.verticalPadding} 0;
  }
`)

const EmptyStateWrapper = styled.div`
  text-align: center;
`

const EmptyStateImage = styled(Image)(({theme}) => `
  height: ${theme.typography.baseFontSize.multiply(12.5)};
  margin: auto;
  padding: ${theme.typography.baseFontSize.multiply(1.5)};
`)

const EmptyStateParagraph = styled.p(({theme}) => {
  const verticalPadding = theme.templateVariables.verticalPadding.multiply(1.5)
  const horizontalPadding = theme.templateVariables.horizontalPadding.multiply(1.5)

  return `
    padding: ${verticalPadding} ${horizontalPadding};
  `
})

const EmptyStateLink = styled(Link)`
  text-decoration: underline;
`

class Results extends Component {
  pickTrendingTopic = () => {
    const {trendingTopics} = this.props

    navigate(`/search?query=${sample(trendingTopics)}`, {replace: true})
  };

  renderEmptyState = () => {
    const {content} = this.props

    return (
      <EmptyStateWrapper>
        <EmptyStateHeading level={3} context={CONTEXT.DISPLAY} sub={content.emptyState.subTitle}>
          {content.emptyState.title}
        </EmptyStateHeading>
        <EmptyStateImage src={emptyStateImage}/>
        <EmptyStateParagraph>
          {content.emptyState.parapgraph}
        </EmptyStateParagraph>
        <EmptyStateLink onClick={() => this.pickTrendingTopic()}>
          {content.emptyState.cta}
        </EmptyStateLink>
      </EmptyStateWrapper>
    )
  };

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
  };

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
  };

  render() {
    const {searchResults} = this.props

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
