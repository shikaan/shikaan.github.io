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
    const {content, list} = this.props;

    return (
      <Section>
        <RelatedArticlesHeading level={2}>
          {content.relatedArticles.title}
        </RelatedArticlesHeading>
        <UnorderedList>
          {
            list.map(({node: article}, index) => {
              const {fields, frontmatter} = article;
              const readingTime = Math.ceil(fields.readingTime.minutes);
              const overline = `${frontmatter.date} – ${readingTime} ${content.shared.readingTime}`;

              return (
                <ListItem key={index}>
                  <Card
                    description={frontmatter.description}
                    image={frontmatter.coverImage.childImageSharp}
                    overline={overline}
                    slug={fields.slug}
                    tags={frontmatter.tags.slice(0,2)}
                    title={frontmatter.title}
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
