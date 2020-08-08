import React, {Component} from "react";
import {graphql} from "gatsby";
import {get} from "lodash";

import Layout from "~templates/Main";
import SEO from "~components/SEO";
import Heading from "~components/Heading";
import styled from "styled-components";
import FourOhFourSVG from "/static/assets/dharma.svg";

import Button from "~components/Button";
import {getMicrocopy, getSection} from "~/utils";

const FourOhFourParagraph = styled.p(({theme}) => {
  const verticalPadding = theme.templateVariables.verticalPadding.multiply(1.5);
  const horizontalPadding = theme.templateVariables.horizontalPadding.multiply(1.5);

  return `
    padding: ${verticalPadding} ${horizontalPadding};
  `;
});

const FourOhFourTitle = styled(Heading)(({theme}) => {
  const verticalPadding = theme.templateVariables.verticalPadding.multiply(1.5);
  const horizontalPadding = theme.templateVariables.horizontalPadding.multiply(1.5);

  return `
    padding: ${verticalPadding} ${horizontalPadding};
  `;
});

const FourOhFourPageWrapper = styled.div`
  text-align: center;
`;

const FourOhFourButton = styled(Button)`
  margin-bottom: 10vh;
`;

class FourOhFourPage extends Component {
  openTrendingArticle = () => {
    const {data, navigate} = this.props;

    navigate(get(data, "featuredArticle.fields.slug"));
  }

  render() {
    const {data} = this.props;

    const content = getSection(data.content.sections, "four-oh-four.main");
    const cta = getMicrocopy(content.microcopy, "four-oh-four.cta");

    return (
      <Layout>
        <SEO title="404: Not Found"/>
        <FourOhFourPageWrapper>
          <FourOhFourTitle level={1}>
            {content.title}
          </FourOhFourTitle>
          <FourOhFourSVG/>
          <FourOhFourParagraph>
            {content.subtitle}
          </FourOhFourParagraph>
          <FourOhFourButton context="accent" onClick={() => this.openTrendingArticle()}>
            {cta}
          </FourOhFourButton>
        </FourOhFourPageWrapper>
      </Layout>
    );
  }
}

export default FourOhFourPage;

export const pageQuery = graphql`
  query ($featuredArticleId: String!) {
    site {
      siteMetadata {
        title
      }
    }
    content: contentfulPage(reference: {eq: "four-oh-four"}) {
      title
      keywords
      sections {
        reference
        subtitle
        microcopy {
          reference
          value
        }
        title
      }
    }
    featuredArticle: contentfulArticle(id: {eq: $featuredArticleId}) {
        slug
    }
  }
`;
