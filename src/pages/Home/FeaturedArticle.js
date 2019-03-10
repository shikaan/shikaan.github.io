import React, {Component} from 'react';
import styled from "styled-components";

import Card, {CONTEXT} from "~components/Card";

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding};
`)

class FeaturedArticle extends Component {
  render() {
    const {featuredArticle, content} = this.props

    const {frontmatter, fields} = featuredArticle
    const readingTime = Math.ceil(fields.readingTime.minutes)

    const overline = `${frontmatter.date} – ${readingTime} ${content.shared.readingTime}`

    return (
      <Section>
        <Card
          context={CONTEXT.FEATURED}
          description={frontmatter.description}
          image={frontmatter.coverImage.childImageSharp}
          overline={overline}
          slug={fields.slug}
          tags={frontmatter.tags}
          title={frontmatter.title}
        />
      </Section>
    );
  }
}

export default FeaturedArticle;
