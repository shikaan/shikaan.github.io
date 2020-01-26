import React, {Component} from "react";
import {graphql} from "gatsby";
import {get} from "lodash";

import {en as content} from "/static/content/FourOhFour";

import Layout from "~templates/Main";
import SEO from "~components/SEO";
import Heading from "~components/Heading";
import styled from "styled-components";
import FourOhFourSVG from "/static/assets/dharma.svg";

import Button from "~components/Button";

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
    return (
      <Layout>
        <SEO title="404: Not Found"/>
        <FourOhFourPageWrapper>
          <FourOhFourTitle level={1}>
            {content.title}
          </FourOhFourTitle>
          <FourOhFourSVG/>
          <FourOhFourParagraph>
            {content.paragraph}
          </FourOhFourParagraph>
          <FourOhFourButton context="accent" onClick={() => this.openTrendingArticle()}>
            {content.cta}
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
    featuredArticle: contentfulArticle(id: {eq: $featuredArticleId}) {
        slug
    }
  }
`;
