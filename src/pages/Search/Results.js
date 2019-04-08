import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {sample} from "lodash";

import EmptyStateSVG from "/static/assets/empty-state.svg";

import {isLastIndex} from "~utils";
import Card from "~components/Card";
import Link, {navigate} from "~components/Link";
import Heading, {CONTEXT} from "~components/Heading";
import Tag from "~components/Tag";
import Image from "~components/Image";
import Divider from "~components/Divider";
import Button from "~components/Button";

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.horizontalPadding};
`);

const ListItem = styled.li(({theme}) => `
  padding: ${theme.templateVariables.horizontalPadding.multiply(.5)} ${theme.templateVariables.horizontalPadding};
`);

const EmptyStateHeading = styled(Heading)(({theme}) => `
  font-size: ${theme.typography.baseFontSize.multiply(2)};
  
  & + small {
    font-size: ${theme.typography.baseFontSize};
    padding: ${theme.templateVariables.verticalPadding} 0;
  }
`);

const EmptyStateWrapper = styled.div`
  text-align: center;
`;

const EmptyStateParagraph = styled.p(({theme}) => {
  const verticalPadding = theme.templateVariables.verticalPadding.multiply(1.5);
  const horizontalPadding = theme.templateVariables.horizontalPadding.multiply(1.5);

  return `
    padding: ${verticalPadding} ${horizontalPadding};
  `;
});

const EmptyStateImage = styled(EmptyStateSVG)`
  height: 35vh;
  width: 80vw;
`;

const EmptyStateButton = styled(Button)`
  margin-bottom: 10vh;
`;

class Results extends Component {
  pickTrendingTopic = () => {
    const {trendingTopics} = this.props;

    navigate(`/search?query=${sample(trendingTopics)}`, {replace: true});
  };

  renderEmptyState = () => {
    const {content} = this.props;

    return (
      <EmptyStateWrapper>
        <EmptyStateHeading level={3} context={CONTEXT.DISPLAY} sub={content.emptyState.paragraph[0]}>
          {content.emptyState.title}
        </EmptyStateHeading>
        <EmptyStateImage/>
        <EmptyStateParagraph>
          {content.emptyState.paragraph[1]}
        </EmptyStateParagraph>
        <EmptyStateButton context="accent" onClick={() => this.pickTrendingTopic()}>
          {content.emptyState.cta}
        </EmptyStateButton>
      </EmptyStateWrapper>
    );
  };

  renderTrendingTopics = () => {
    const {content, trendingTopics} = this.props;

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
    );
  };

  renderResultList = () => {
    const {content, searchResults} = this.props;

    return (
      <ul>
        {
          searchResults.map(({node: article}, index) => {
            const {fields, frontmatter} = article;
            const readingTime = Math.ceil(fields.readingTime.minutes);
            const overline = `${frontmatter.date} – ${readingTime} ${content.shared.readingTime}`;

            return (
              <li key={index}>
                <Card
                  description={frontmatter.description}
                  image={frontmatter.coverImage.childImageSharp}
                  overline={overline}
                  slug={fields.slug}
                  tags={frontmatter.tags.slice(0, 2)}
                  title={frontmatter.title}
                  replaceOnTagNavigate
                />
                {!isLastIndex(searchResults, index) && <Divider/>}
              </li>
            );
          })
        }
      </ul>
    );
  };

  render() {
    const {searchResults} = this.props;

    const isFirstSearch = !searchResults;
    const hasResults = searchResults && !!searchResults.length;

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
};

export default Results;
