import React, {Component} from "react";
import styled from "styled-components";

import {Size} from "~theme";

import Card from "~components/Card";
import Divider from "~components/Divider";
import Heading from "~components/Heading";
import {isLastIndex} from "~utils";

const Section = styled.section(({theme}) => `
  padding: ${theme.templateVariables.horizontalPadding}
`);

const UnorderedList = styled.ul(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} 0;
`);

const ListItem = styled.li(() => `
  min-width: ${new Size(40)};
  max-width: 62%;
  margin: auto;
`);

const RelatedArticlesHeading = styled(Heading)(({theme}) => `
  padding: 0 ${theme.typography.baseFontSize.multiply(0.5)}
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
              const {slug, coverImage, description, title, tags, readingTime, createdAt} = article;
              const overline = `${createdAt} – ${readingTime} ${content.shared.readingTime}`;

              return (
                <ListItem key={index}>
                  <Card
                    description={description}
                    image={coverImage}
                    overline={overline}
                    slug={slug}
                    tags={tags.slice(0,2)}
                    title={title}
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
