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
              const {description, coverImage, slug, tags, title, timeToRead, createdAt} = article;
              const overline = `${createdAt} – ${timeToRead} ${content.shared.readingTime}`;

              return (
                <ListItem key={index}>
                  <Card
                    description={description}
                    image={coverImage.childImageSharp}
                    overline={overline}
                    slug={slug}
                    tags={tags.slice(0, 2)}
                    title={title}
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
