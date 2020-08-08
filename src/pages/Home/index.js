import React, {Component} from "react";
import {get} from "lodash";
import {graphql} from "gatsby";

import Template from "~templates/Main";
import SEO from "~components/SEO";

import FeaturedArticle from "./FeaturedArticle";
import OtherArticles from "./OtherArticles";
import {getSection} from "~/utils";

class HomePage extends Component {
  render() {
    const {data = {}} = this.props;
    const {featuredArticle, site, content} = data;

    const _otherArticles = get(data, "otherArticles.edges", []);
    const otherArticles = _otherArticles.map(i => i.node); // FIXME: when we flatten queries
    const featuredArticleContent = getSection(content.sections, "home.featured-article");
    const otherArticlesContent = getSection(content.sections, "home.other-articles");

    return (
      <Template>
        <SEO lang={"en"}
             title={site.title}
             description={site.description}
             keywords={content.keywords}
             slug={"/home"}/>

        <FeaturedArticle featuredArticle={featuredArticle} content={featuredArticleContent}/>
        <OtherArticles otherArticles={otherArticles} content={otherArticlesContent}/>
      </Template>
    );
  }
}

export default HomePage;

export const pageQuery = graphql`
  query ($featuredArticleId: String!) {
    site {
      siteMetadata {
        title,
        description
      }
    }
    content: contentfulPage(reference: { eq: "home" }) {
      title
      keywords
      sections {
        microcopy {
          reference
          value
        }
        reference
      }
    }
    featuredArticle: contentfulArticle(id: {eq: $featuredArticleId}) {
        slug
        title
        description
        publishDate(formatString: "MMMM DD, YYYY")
        commentLink
        tags
        coverImage {
            fluid {
                ...GatsbyContentfulFluid
            }
        }
        timeToRead
    }
    otherArticles: allContentfulArticle (
      limit: 4,
      sort: {
        fields: [publishDate], order: DESC
      },
      filter: {
        id: {ne: $featuredArticleId}
      }
    ) {
        edges {
            node {
                slug
                title
                publishDate(formatString: "MMMM DD, YYYY")
                tags
                timeToRead
                coverImage {
                    fluid {
                        ...GatsbyContentfulFluid
                    }
                }   
            }
        }
    }
  }
`;
