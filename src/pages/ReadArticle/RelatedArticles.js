import React, {Component} from "react";
import styled from "styled-components";

import Card, {CONTEXT} from "~components/Card";
import Divider from "~components/Divider";
import Heading from "~components/Heading";
import {CardListItem, UnorderedCardList} from "~components/CardList";
import {isTablet, getMicrocopy, validateSlug} from "~/utils";
import {RELATED_ARTICLES_LIST_LENGTH} from "~/constants";

const Section = styled.section(({theme}) => `
  max-width: ${theme.breakpoint.sm};
  margin: auto;
`);

const RelatedArticlesHeading = styled(Heading)(({theme}) => `
  padding: ${theme.typography.baseFontSize.multiply(1.5)} ${theme.typography.baseFontSize.multiply(.5)};
  color: ${theme.color.dark500}
`);

class RelatedArticles extends Component {
  render() {
    const {content, list, fallbackList} = this.props;

    const articles = list.length === RELATED_ARTICLES_LIST_LENGTH 
      ? list 
      : list.concat(fallbackList).slice(0, RELATED_ARTICLES_LIST_LENGTH);

    return (
      <Section>
        <RelatedArticlesHeading level={2}>
          {content.title}
        </RelatedArticlesHeading>
        <UnorderedCardList>
          {
            articles.map(({node: article}, index) => {
              const {slug, coverImage, description, title, tags, body, publishDate} = article;
              const overline = `${publishDate} – ${body.childMarkdownRemark?.timeToRead} ${getMicrocopy(content.microcopy, "shared.reading-time")}`;

              return (
                <CardListItem key={index}>
                  <Card
                    description={description}
                    image={coverImage}
                    overline={overline}
                    slug={validateSlug(slug)}
                    tags={tags.slice(0,2)}
                    title={title}
                    context={isTablet() ? CONTEXT.LIST : CONTEXT.POLAROID}
                  />
                  <Divider/>
                </CardListItem>
              );
            })
          }
        </UnorderedCardList>
      </Section>
    );
  }
}

export default RelatedArticles;
