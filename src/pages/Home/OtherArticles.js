import React, {PureComponent} from "react";
import styled from "styled-components";

import Card, {CONTEXT} from "~components/Card";
import Divider from "~components/Divider";
import {CardListItem, UnorderedCardList} from "~components/CardList";
import {isTablet} from "~utils";

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.horizontalPadding};
`);

class OtherArticles extends PureComponent {
  render() {
    const {otherArticles, content} = this.props;
    return (
      <Section>
        <UnorderedCardList>
          {
            otherArticles.map((article, index) => {
              const {slug, coverImage, description, title, tags, timeToRead, createdAt} = article;
              const overline = `${createdAt} – ${timeToRead} ${content.shared.readingTime}`;

              return (
                <CardListItem key={index}>
                  <Card
                    description={description}
                    image={coverImage}
                    overline={overline}
                    slug={slug}
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

export default OtherArticles;
