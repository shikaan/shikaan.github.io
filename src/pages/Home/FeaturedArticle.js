import React, {Component} from "react";
import styled from "styled-components";

import Card, {CONTEXT} from "~components/Card";
import Divider from "~components/Divider";
import {validateSlug} from "~/utils";

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.verticalPadding};
`);

class FeaturedArticle extends Component {
  render() {
    const {featuredArticle, content} = this.props;

    const {description, coverImage, slug, tags, title, timeToRead, publishDate} = featuredArticle;

    const overline = `${publishDate} – ${timeToRead} ${content.shared.readingTime}`;

    return (
      <Section>
        <Card
          context={CONTEXT.FEATURED}
          description={description}
          image={coverImage}
          overline={overline}
          slug={validateSlug(slug)}
          tags={tags.slice(0,2)}
          title={title}
        />
        <Divider/>
      </Section>
    );
  }
}

export default FeaturedArticle;
