import React, {PureComponent} from "react";
import styled from "styled-components";

import Card from "~components/Card";
import Divider from "~components/Divider";

import {Size} from "~theme";
import {isLastIndex} from "~utils";

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.horizontalPadding};
`);

const ListItem = styled.li(() => `
  min-width: ${new Size(40)};
  max-width: 62%;
  margin: auto;
`);

class OtherArticles extends PureComponent {
  render() {
    const {otherArticles, content} = this.props;
    return (
      <Section>
        <ul>
          {
            otherArticles.map((article, index) => {
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
                    tags={frontmatter.tags.slice(0, 2)}
                    title={frontmatter.title}
                  />
                  {!isLastIndex(otherArticles, index) && <Divider/>}
                </ListItem>
              );
            })
          }
        </ul>
      </Section>
    );
  }
}

export default OtherArticles;
