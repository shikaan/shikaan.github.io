import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {sample} from "lodash";

import {isLastIndex} from "~utils";

import Card from "~components/Card";
import {navigate} from "~components/Link";
import Heading, {CONTEXT} from "~components/Heading";
import Tag from "~components/Tag";
import Divider from "~components/Divider";

import EmptyState from "./EmptyState";
import {validateSlug} from "~/utils";

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.horizontalPadding};
`);

const ListItem = styled.li(({theme}) => `
  padding: ${theme.templateVariables.horizontalPadding.multiply(.5)} ${theme.templateVariables.horizontalPadding};
`);

class Results extends Component {
  pickTrendingTopic = () => {
    const {trendingTopics} = this.props;

    navigate(`/search?query=${sample(trendingTopics)}`, {replace: true});
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
            const {slug, coverImage, description, title, tags, body, createdAt} = article;
            const overline = `${createdAt} – ${body.childMarkdownRemark.timeToRead} ${content.shared.readingTime}`;

            return (
              <li key={index}>
                <Card
                  description={description}
                  image={coverImage}
                  overline={overline}
                  slug={validateSlug(slug)}
                  tags={tags.slice(0, 2)}
                  title={title}
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
    const {searchResults, content} = this.props;

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
          !isFirstSearch && !hasResults && <EmptyState content={content} pickTrendingTopic={this.pickTrendingTopic}/>
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
