import React, {Component} from "react";
import styled from "styled-components";

import {Size} from "~theme";

import Card, {CONTEXT} from "~components/Card";
import Divider from "~components/Divider";
import Heading from "~components/Heading";
import {isLastIndex, isTablet} from "~utils";

const Section = styled.section(({theme}) => `
  max-width: ${theme.breakpoint.sm};
  margin: auto;
`);

const UnorderedList = styled.ul(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding};
  display: grid;
  grid-gap: ${new Size(2)};
  

  @media (min-width: ${theme.breakpoint.xs}) {
    grid-template-columns: 1fr;
  }
  
  @media (min-width: ${theme.breakpoint.md}) {
    grid-template-columns: 1fr 1fr;
  }
`);

const ListItem = styled.li(({theme}) => `
  margin: auto;
  height: 100%;
  width: 100%;
  
  @media (min-width: ${theme.breakpoint.xs}) {
    min-width: ${new Size(32)};
  }
`);

const RelatedArticlesHeading = styled(Heading)(({theme}) => `
  padding: ${theme.typography.baseFontSize.multiply(1.5)} ${theme.typography.baseFontSize.multiply(.5)};
  color: ${theme.color.dark500}
`);

class RelatedArticles extends Component {
  render() {
    const {content, list, fallbackList} = this.props;

    const articles = list.length ? list : fallbackList;

    return (
      <Section>
        <RelatedArticlesHeading level={2}>
          {content.relatedArticles.title}
        </RelatedArticlesHeading>
        <UnorderedList>
          {
            articles.map(({node: article}, index) => {
              const {slug, coverImage, description, title, tags, body, updatedAt} = article;
              const overline = `${updatedAt} – ${body.childMarkdownRemark?.timeToRead} ${content.shared.readingTime}`;

              return (
                <ListItem key={index}>
                  <Card
                    description={description}
                    image={coverImage}
                    overline={overline}
                    slug={slug}
                    tags={tags.slice(0,2)}
                    title={title}
                    context={isTablet() ? CONTEXT.LIST : CONTEXT.POLAROID}
                  />
                  {!isLastIndex(list, index) && <Divider/>}
                </ListItem>
              );
            })
          }
        </UnorderedList>
      </Section>
    );
  }
}

export default RelatedArticles;
